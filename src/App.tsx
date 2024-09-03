import {
	AccumulativeShadows,
	Center,
	Environment,
	OrbitControls,
	RandomizedLight,
	// Grid,
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
import { memo } from 'react';
import StandardMaterial from './utils/StandardMaterial';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import KitchenSink from './3D/kitchen-sink';
import { Base, Difference, Geometry, Subtraction } from '@react-three/csg';

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
						<Shadows />
					</group>
					<IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
						<OrbitControls />
					</IfInSessionMode>
					<Locomotion />
					<Environment preset="city" />
					<ambientLight />
					<hemisphereLight args={['#ffeeb1', '#080820', 4]} />
				</XR>
			</Canvas>
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

const Shadows = memo(() => (
	<AccumulativeShadows
		temporal
		frames={100}
		color="#9d4b4b"
		colorBlend={0.5}
		alphaTest={0.9}
		scale={20}
	>
		<RandomizedLight amount={8} radius={4} position={[0, 5, 0]} />
	</AccumulativeShadows>
));

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

			<Floorplan />
		</group>
	);
}

function Kitchen() {
	return (
		<group position={[3.525, 0, 0.12]}>
			<group position={[0.6 / -2, 0, 3.3 / -2]}>
				// toe kick
				<Center top position={[0.03, 0, 0.03]}>
					<mesh receiveShadow castShadow>
						<boxGeometry args={[0.6 - 0.06, 0.15, 3.3 - 0.06]} />
						<meshStandardMaterial color="#ddd0c4" />
					</mesh>
				</Center>
				// bottom row
				<Cabinet
					width={0.6}
					heigth={0.75}
					zPosition={0.15}
					xPosition={3.3 / 2 - 0.6 / 2}
				/>
				<Cabinet
					width={0.6}
					heigth={0.75}
					zPosition={0.15}
					xPosition={3.3 / 2 - 0.6 / 2 - 0.6}
				/>
				<Cabinet
					width={0.9}
					heigth={0.375}
					zPosition={0.15 + 0.375}
					xPosition={3.3 / 2 - 0.9 / 2 - 0.6 - 0.6}
				/>
				<Cabinet
					width={0.9}
					heigth={0.375}
					zPosition={0.15}
					xPosition={3.3 / 2 - 0.9 / 2 - 0.6 - 0.6}
				/>
				<Cabinet
					width={0.6}
					heigth={0.75}
					zPosition={0.15}
					xPosition={3.3 / 2 - 0.6 / 2 - 0.6 - 0.6 - 0.9}
				/>
				<Cabinet
					width={0.6}
					heigth={0.75}
					zPosition={0.15}
					xPosition={3.3 / 2 - 0.6 / 2 - 0.6 - 0.6 - 0.9 - 0.6}
				/>
				// oven
				<Oven zPosition={0.9} xPosition={3.3 / 2 - 0.6 / 2} />
				// top row
				<Cabinet
					width={0.6}
					heigth={0.8}
					zPosition={1.7}
					xPosition={3.3 / 2 - 0.6 / 2}
				/>
				<Cabinet
					width={0.6}
					heigth={0.8}
					zPosition={1.7}
					xPosition={3.3 / 2 - 0.6 / 2 - 0.6}
				/>
				<Cabinet
					width={0.45}
					heigth={0.8}
					zPosition={1.7}
					xPosition={3.3 / 2 - 0.45 / 2 - 0.6 - 0.6}
				/>
				<Cabinet
					width={0.45}
					heigth={0.8}
					zPosition={1.7}
					xPosition={3.3 / 2 - 0.45 / 2 - 0.6 - 0.6 - 0.45}
				/>
				<Cabinet
					width={0.6}
					heigth={0.8}
					zPosition={1.7}
					xPosition={3.3 / 2 - 0.6 / 2 - 0.6 - 0.6 - 0.9}
				/>
				// countertop
				<CounterTop1 />
				// fridge
				<Cabinet
					width={0.6}
					heigth={1.6}
					zPosition={0.9}
					xPosition={-1.35}
				/>
			</group>
			<group
				rotation={[0, Math.PI, 0]}
				position={[0.6 / -2 - 0.93 - 0.7, 0, 3.3 / -2]}
			>
				// toe kick
				<Center top position={[0.03, 0, -0.28]}>
					<mesh receiveShadow castShadow>
						<boxGeometry args={[0.7 - 0.06, 0.15, 2.8 - 0.06]} />
						<meshStandardMaterial color="#ddd0c4" />
					</mesh>
				</Center>
				<Cabinet
					width={0.6}
					heigth={0.75}
					depth={0.7}
					zPosition={0.15}
					xPosition={0.6 / 2 - 3.3 / 2}
				/>
				<Cabinet
					width={0.9}
					heigth={0.75}
					depth={0.7}
					zPosition={0.15}
					xPosition={0.9 / 2 - 3.3 / 2 + 0.6}
				/>
				<SinkCabinets />
				<Cabinet
					width={0.5}
					heigth={0.75}
					depth={0.7}
					zPosition={0.15}
					xPosition={0.5 / 2 - 3.3 / 2 + 0.6 + 0.9 + 0.4 + 0.4}
				/>
				<CounterTop2 />
			</group>
		</group>
	);
}

function SinkCabinets() {
	const zPosition = 0.15;
	const xPosition = 0.8 / 2 - 3.3 / 2 + 0.6 + 0.9;
	const width = 0.8;
	const depth = 0.7;
	const heigth = 0.75;

	return (
		<>
			<Center
				top
				position={[0, zPosition, xPosition]}
				receiveShadow
				castShadow
			>
				<mesh position={[0.015 / 2, 0, 0]}>
					<Geometry>
						<Base>
							<boxGeometry
								args={[depth - 0.015, heigth, width]}
							/>
						</Base>
						<Subtraction position={[-0.015, 0.015, 0]}>
							<boxGeometry
								args={[
									depth - 0.015,
									heigth - 0.015,
									width - 0.03,
								]}
							/>
						</Subtraction>
					</Geometry>

					<meshStandardMaterial color="#ddd0c4" />
				</mesh>
				<CabinetDoor
					width={width / 2}
					depth={depth}
					heigth={heigth}
					xPosition={-width / 4}
				/>
				<CabinetDoor
					width={width / 2}
					depth={depth}
					heigth={heigth}
					xPosition={width / 4}
				/>
			</Center>
		</>
	);
}

function Cabinet({
	width,
	depth = 0.6,
	heigth,
	zPosition,
	xPosition,
}: {
	width: number;
	depth?: number;
	heigth: number;

	zPosition: number;
	xPosition: number;
}) {
	return (
		<Center
			top
			position={[0, zPosition, xPosition]}
			receiveShadow
			castShadow
		>
			<mesh position={[0.015 / 2, 0, 0]}>
				<Geometry>
					<Base>
						<boxGeometry args={[depth - 0.015, heigth, width]} />
					</Base>
					<Subtraction position={[-0.015, 0, 0]}>
						<boxGeometry
							args={[depth - 0.015, heigth - 0.03, width - 0.03]}
						/>
					</Subtraction>
				</Geometry>

				<meshStandardMaterial color="#ddd0c4" />
			</mesh>
			<CabinetDoor width={width} depth={depth} heigth={heigth} />
		</Center>
	);
}

function CabinetDoor({
	width,
	depth = 0.6,
	heigth,
	xPosition = 0,
}: {
	width: number;
	depth?: number;
	heigth: number;

	xPosition?: number;
}) {
	const doorPanelGeometry = new RoundedBoxGeometry(
		0.01,
		heigth - 0.02,
		width - 0.005,
		5,
		0.002,
	);
	return (
		<mesh
			position={[-depth / 2 + 0.01 / 2, -0.02 / 2, xPosition]}
			receiveShadow
			castShadow
			geometry={doorPanelGeometry}
		>
			<meshStandardMaterial color="#ddd0c4" />
		</mesh>
	);
}

function CounterTop1() {
	const inductionHobGeometry = new RoundedBoxGeometry(
		0.45,
		0.008,
		0.6,
		5,
		0.004,
	);
	const counterTopGeometry = new RoundedBoxGeometry(0.6, 0.03, 2.1, 5, 0.004);
	return (
		<Center top position={[0, 0.9, 0]}>
			<mesh receiveShadow castShadow geometry={counterTopGeometry}>
				<StandardMaterial folder="oak-veneer" />
			</mesh>
			<mesh
				position={[0, 0.03 / 2 + 0.008 / 2, -0.15]}
				receiveShadow
				castShadow
				geometry={inductionHobGeometry}
			>
				<meshPhysicalMaterial
					color="#1f1f1f"
					metalness={1}
					roughness={0.05}
					envMapIntensity={0.3}
				/>
			</mesh>
		</Center>
	);
}

function CounterTop2() {
	const counterTopGeometry = new RoundedBoxGeometry(0.9, 0.03, 3.3, 5, 0.004);
	return (
		<>
			<Center top position={[0.1, 0.9, 0]}>
				<mesh receiveShadow castShadow geometry={counterTopGeometry}>
					<Geometry>
						<Base geometry={counterTopGeometry} />
						<Difference position={[-0.1, 0, 0.25]}>
							<boxGeometry args={[0.48, 0.03, 0.75]} />
						</Difference>
					</Geometry>
					<StandardMaterial folder="oak-veneer" />
				</mesh>
			</Center>
			<KitchenSink
				rotation={[0, -Math.PI / 2, 0]}
				position={[0, 0.887, 0.25]}
			/>
		</>
	);
}

function Oven({
	zPosition,
	xPosition,
}: {
	zPosition: number;
	xPosition: number;
}) {
	const controlPanelGeometry = new RoundedBoxGeometry(
		0.01,
		0.2 - 0.02,
		0.6 - 0.005,
		5,
		0.002,
	);
	const doorPanelGeometry = new RoundedBoxGeometry(
		0.01,
		0.4 - 0.02,
		0.6 - 0.005,
		5,
		0.002,
	);
	return (
		<Center
			top
			position={[0, zPosition, xPosition]}
			receiveShadow
			castShadow
		>
			<mesh position={[0.015 / 2, 0, 0]}>
				<boxGeometry args={[0.6 - 0.015, 0.8, 0.6]} />
				<meshStandardMaterial color="#ddd0c4" />
			</mesh>
			<mesh
				position={[-0.6 / 2 + 0.01 / 2, 0.2, 0]}
				receiveShadow
				castShadow
				geometry={controlPanelGeometry}
			>
				<meshPhysicalMaterial
					color="#1f1f1f"
					metalness={1}
					roughness={0.05}
					envMapIntensity={0.3}
					opacity={0.8}
					transparent
				/>
			</mesh>
			<mesh
				position={[-0.6 / 2 + 0.01 / 2, -0.085, 0]}
				receiveShadow
				castShadow
				geometry={doorPanelGeometry}
			>
				<meshPhysicalMaterial
					color="#1f1f1f"
					metalness={1}
					roughness={0.05}
					envMapIntensity={0.3}
					opacity={0.8}
					transparent
				/>
			</mesh>
		</Center>
	);
}

function Bedrooms() {
	return (
		<IfInSessionMode
			deny={
				[
					/*'immersive-ar', 'immersive-vr'*/
				]
			}
		>
			<Bed position={[-2.3, 0, 5.3]} rotation={[0, Math.PI, 0]} />
			<Bed position={[2.3, 0, 5.3]} />
			<Desk position={[2, 0, 3.1]} />
		</IfInSessionMode>
	);
}
