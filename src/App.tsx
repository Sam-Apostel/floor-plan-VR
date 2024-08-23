import {
	AccumulativeShadows,
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

const store = createXRStore();

function App() {
	return (
		<>
			<button
				onClick={() => store.enterVR()}
				style={{
					paddingBlock: '4px',
					margin: '4px',
				}}
			>
				Enter VR
			</button>
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
			<IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
				<Bed position={[-2.3, 0, 5.3]} rotation={[0, Math.PI, 0]} />
				<Bed position={[2.3, 0, 5.3]} />
				<Desk position={[2, 0, 3.1]} />
			</IfInSessionMode>
			<Floorplan />
		</group>
	);
}
