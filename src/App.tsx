import {
	AccumulativeShadows,
	Environment,
	OrbitControls,
	RandomizedLight,
	Grid,
} from '@react-three/drei';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { memo } from 'react';

import { IfInSessionMode, XR, XROrigin, createXRStore } from '@react-three/xr';
import { useLocomotion } from './useLocomotion';
import Floorplan from './3D/Floorplan';
import { walls } from './3D/data';
import { Wall } from './3D/Wall';

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
						<Grid
							position={[0, -0.01, 0]}
							args={[10, 10]}
							{...{
								cellSize: 0.5,
								cellThickness: 1,
								cellColor: '#6f6f6f',
								sectionSize: 2.5,
								sectionThickness: 1.5,
								sectionColor: '#9d4b4b',
								fadeDistance: 25,
								fadeStrength: 1,
								followCamera: false,
								infiniteGrid: true,
							}}
						/>
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
		// temporal
		// frames={100}
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
			{walls.map((wall, i) => (
				<Wall {...wall} key={i} />
			))}
			<Floorplan />
		</group>
	);
}
