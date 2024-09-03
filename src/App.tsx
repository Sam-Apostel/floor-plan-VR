import {
	Environment,
	OrbitControls,
	Sky,
	SoftShadows,
} from '@react-three/drei';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { IfInSessionMode, XR, XROrigin, createXRStore } from '@react-three/xr';
import { useLocomotion } from './useLocomotion';
import Floorplan from './3D/Floorplan';
import { rooms } from './3D/data';
import { Wall } from './3D/Wall';
import Floor from './3D/Floor';
import Bed from './3D/Bed';
import { Desk } from './3D/Desk';

import { EffectComposer, SSAO } from '@react-three/postprocessing';

import { BlendFunction } from 'postprocessing';
import Kitchen from './3D/Kitchen';

const store = createXRStore();

function App() {
	return (
		<>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
				}}
			>
				<button
					onClick={() => store.enterVR()}
					style={{
						paddingBlock: '4px',
						margin: '4px',
					}}
				>
					Enter VR
				</button>
				<button
					onClick={() => store.enterAR()}
					style={{
						paddingBlock: '4px',
						margin: '4px',
					}}
				>
					Enter AR
				</button>
			</div>
			<Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>
				<XR store={store}>
					<group position={[0, 0, 0]}>
						<Scene />
						{/* <Shadows /> */}
					</group>
					<IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
						<OrbitControls />
					</IfInSessionMode>
					<Locomotion />
					<Lighting />
					<Effects />
				</XR>
			</Canvas>
		</>
	);
}

function Effects() {
	return (
		<EffectComposer enableNormalPass>
			<SSAO
				blendFunction={BlendFunction.MULTIPLY} // blend mode
				samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
				rings={4} // amount of rings in the occlusion sampling pattern
				distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
				distanceFalloff={0.0} // distance falloff. min: 0, max: 1
				rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
				rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
				luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
				radius={20} // occlusion sampling radius
				// scale={0.5} // scale of the ambient occlusion
				bias={0.5} // occlusion bias
				worldDistanceThreshold={0.1}
				worldDistanceFalloff={0.1}
				worldProximityThreshold={0.1}
				worldProximityFalloff={0.1}
			/>
		</EffectComposer>
	);
}

function Lighting() {
	// const light = useRef<RectAreaLight>(null!);

	// useHelper(light, RectAreaLightHelper, 'red');

	return (
		<>
			<Environment preset="city" />
			<hemisphereLight args={['#ffeeb1', '#080820', 1]} />
			<Sky />
			<ambientLight intensity={0.4} />
			<rectAreaLight
				width={0.2}
				height={2}
				position={[3.4, 1.7, -1.52]}
				rotation-x={-Math.PI / 2}
				intensity={5}
				color="#ffffa0"
			/>

			<rectAreaLight
				width={0.2}
				height={2}
				position={[1.5, 1.7, -1.52]}
				rotation-x={-Math.PI / 2}
				intensity={10}
				color="#ffffa0"
			/>

			{/* <rectAreaLight
				width={2}
				height={2}
				position={[1.65, 1, 7]}
				intensity={4}
				color="#ffffa0"
			/>
			<rectAreaLight
				width={2}
				height={2}
				position={[-1.85, 1, 7]}
				intensity={4}
				color="#ffffa0"
			/> */}

			<rectAreaLight
				width={3}
				height={0.1}
				position={[0, 2.5, 2.25]}
				rotation-x={-Math.PI / 2}
				intensity={12}
				color="#ffffdd"
			/>
			<SoftShadows samples={16} focus={0.5} size={35} />
			<directionalLight
				position={[1.5, 2.5, -1.52]}
				castShadow
				intensity={5}
				shadow-mapSize={2048}
				shadow-bias={-0.001}
			>
				<orthographicCamera
					attach="shadow-camera"
					left={-8.5}
					right={8.5}
					top={8.5}
					bottom={-8.5}
					near={0.1}
					far={20}
				/>
			</directionalLight>
			{/* <fog attach="fog" args={['#d0d0d0', 8, 35]} /> */}
		</>
	);
}

function Locomotion() {
	const locomotionRef = useLocomotion({
		speed: 1.4,
		smoothTurningSpeed: 1.4,
		disableSnapTurning: true,
		enableSmoothTurning: true,
	});
	return <XROrigin ref={locomotionRef} />;
}

export default App;

function Scene() {
	return (
		<group position={[0, 0, 0]}>
			{rooms.map((room) => (
				<group key={room.name}>
					{room.walls.map((wall, i) => (
						<Wall {...wall} key={i} />
					))}

					<Floor {...room.floor} />
				</group>
			))}
			<Kitchen />
			<Bedrooms />
			<Floorplan />
		</group>
	);
}

function Bedrooms() {
	return (
		<IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
			<Bed position={[-2.3, 0, 5.3]} rotation={[0, Math.PI, 0]} />
			<Bed position={[2.3, 0, 5.3]} />
			<Desk position={[2, 0, 3.1]} />
		</IfInSessionMode>
	);
}
