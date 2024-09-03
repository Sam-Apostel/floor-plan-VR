import {
	Center,
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
import StandardMaterial from './utils/StandardMaterial';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import KitchenSink from './3D/kitchen-sink';
import { Base, Difference, Geometry, Subtraction } from '@react-three/csg';
import { EffectComposer, SSAO } from '@react-three/postprocessing';

import { BlendFunction } from 'postprocessing';

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
			<fog attach="fog" args={['#d0d0d0', 8, 35]} />
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

function Kitchen() {
	return (
		<group position={[3.525, 0, 0.12]}>
			<group position={[0.6 / -2, 0, 3.3 / -2]}>
				{/* toe kick */}
				<Center top position={[0.03, 0, 0.03]}>
					<mesh receiveShadow castShadow>
						<boxGeometry args={[0.6 - 0.06, 0.15, 3.3 - 0.06]} />
						<CabinetMaterial />
					</mesh>
				</Center>
				{/* bottom row */}
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
				{/* oven */}
				<Oven zPosition={0.9} xPosition={3.3 / 2 - 0.6 / 2} />
				{/* top row */}
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
				{/* countertop */}
				<CounterTop1 />
				{/* fridge */}
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
				{/* toe kick */}
				<Center top position={[0.03, 0, -0.28]}>
					<mesh receiveShadow castShadow>
						<boxGeometry args={[0.7 - 0.06, 0.15, 2.8 - 0.06]} />
						<CabinetMaterial />
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
				<mesh position={[0.015 / 2, 0, 0]} receiveShadow castShadow>
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

					<CabinetMaterial />
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

function CabinetMaterial() {
	return (
		<meshPhysicalMaterial color="#fffaf7" metalness={0.6} roughness={0.7} />
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
			<mesh position={[0.015 / 2, 0, 0]} receiveShadow castShadow>
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

				<CabinetMaterial />
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
			<CabinetMaterial />
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
			<mesh position={[0.015 / 2, 0, 0]} receiveShadow castShadow>
				<boxGeometry args={[0.6 - 0.015, 0.8, 0.6]} />
				<CabinetMaterial />
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
