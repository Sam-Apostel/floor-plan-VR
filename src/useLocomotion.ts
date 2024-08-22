import { useFrame, useThree } from '@react-three/fiber';
import { useXRInputSourceState } from '@react-three/xr';
import { useRef } from 'react';
import { Group, MathUtils, Quaternion, Vector3 } from 'three';

export interface LocomotionOptions {
	handControllingMovement?: 'left' | 'right';
	speed?: number;
	numberOfDegreesToSnapTurnBy?: number;
	viewControlDeadZone?: number;
	disableSnapTurning?: boolean;
	enableSmoothTurning?: boolean;
	smoothTurningSpeed?: number;
}

/**
 * A hook for handling basic locomotion in VR
 * @param options Options that can be provided to customize the locomotion behavior
 * @returns A ref to be assigned to the <XROrigin> component (i.e. <XROrigin ref={locomotionRef}>)
 */
export function useLocomotion(options?: LocomotionOptions) {
	const defaultSpeed = 2;
	const defaultSmoothTurningSpeed = 2;
	const defaultEnableSmoothTurning = false;
	const defaultNumberOfDegreesToSnapTurnBy = 45;
	const defaultHandControllingMovement = 'left';
	const defaultViewControlDeadZone = 0.5;
	const thumbstickPropName = 'xr-standard-thumbstick';
	const cameraQuaternion = new Quaternion();

	// Assign default values to options that are not provided
	const {
		handControllingMovement = defaultHandControllingMovement,
		speed = defaultSpeed,
		numberOfDegreesToSnapTurnBy = defaultNumberOfDegreesToSnapTurnBy,
		viewControlDeadZone = defaultViewControlDeadZone,
		enableSmoothTurning = defaultEnableSmoothTurning,
		smoothTurningSpeed = defaultSmoothTurningSpeed,
		disableSnapTurning,
	} = options || {};

	const positionInfo = useRef<Group>(null);
	const canRotate = useRef(true);
	const camera = useThree((s) => s.camera);

	const l_controller = useXRInputSourceState('controller', 'left');
	const r_controller = useXRInputSourceState('controller', 'right');

	const movementController =
		handControllingMovement === 'left' ? l_controller : r_controller;
	const viewController =
		handControllingMovement === 'left' ? r_controller : l_controller;

	useFrame((_, delta) => {
		if (
			positionInfo.current == null ||
			movementController == null ||
			viewController == null
		)
			return;

		const movementThumbstickState =
			movementController.gamepad[thumbstickPropName];

		const movementXAxisOrDefault = movementThumbstickState?.xAxis ?? 0;
		const movementYAxisOrDefault = movementThumbstickState?.yAxis ?? 0;

		const viewThumbstickState = viewController.gamepad[thumbstickPropName];
		const viewXAxisOrDefault = viewThumbstickState?.xAxis ?? 0;

		// If no joystick input, return
		if (
			movementXAxisOrDefault === 0 &&
			movementYAxisOrDefault === 0 &&
			viewXAxisOrDefault === 0
		)
			return;

		// Handle snapping rotation using the viewController
		let rotationQuaternion = null;
		if (!disableSnapTurning && !enableSmoothTurning) {
			if (
				viewXAxisOrDefault < -viewControlDeadZone &&
				canRotate.current
			) {
				canRotate.current = false;
				rotationQuaternion = new Quaternion().setFromAxisAngle(
					new Vector3(0, 1, 0),
					MathUtils.degToRad(numberOfDegreesToSnapTurnBy),
				);
				positionInfo.current.quaternion.multiply(rotationQuaternion);
			} else if (
				viewXAxisOrDefault > viewControlDeadZone &&
				canRotate.current
			) {
				canRotate.current = false;
				rotationQuaternion = new Quaternion().setFromAxisAngle(
					new Vector3(0, 1, 0),
					-MathUtils.degToRad(numberOfDegreesToSnapTurnBy),
				);
				positionInfo.current.quaternion.multiply(rotationQuaternion);
			} else if (
				viewXAxisOrDefault > -viewControlDeadZone &&
				viewXAxisOrDefault < viewControlDeadZone
			) {
				canRotate.current = true;
			}
		} else if (enableSmoothTurning) {
			if (Math.abs(viewXAxisOrDefault) > viewControlDeadZone) {
				positionInfo.current.rotateY(
					(viewXAxisOrDefault < 0 ? 1 : -1) *
						delta *
						smoothTurningSpeed,
				);
			}
		}

		// Handle movement using the movementController
		const inputVector = new Vector3(
			movementXAxisOrDefault,
			0,
			movementYAxisOrDefault,
		);
		camera.getWorldQuaternion(cameraQuaternion);
		inputVector.applyQuaternion(cameraQuaternion);

		if (rotationQuaternion) {
			inputVector.applyQuaternion(rotationQuaternion);
		}

		let xChange = positionInfo.current.position.x;
		let zChange = positionInfo.current.position.z;

		if (inputVector.x !== 0) {
			xChange += inputVector.x * delta * speed;
		}

		if (inputVector.z !== 0) {
			zChange += inputVector.z * delta * speed;
		}

		if (
			xChange !== positionInfo.current.position.x ||
			zChange !== positionInfo.current.position.z
		) {
			positionInfo.current.position.x = xChange;
			positionInfo.current.position.z = zChange;
		}
	});

	return positionInfo;
}
