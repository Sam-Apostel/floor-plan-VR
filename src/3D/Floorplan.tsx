import { Image } from '@react-three/drei';

const scale = 18.4;
const aspectRatio = 990 / 2352;

export default function Floorplan() {
	return (
		<Image
			url="/floor-plan.png"
			transparent
			opacity={0.5}
			scale={[scale * aspectRatio, scale]}
			position={[0, -0.001, 0]}
			rotation={[-Math.PI / 2, 0, 0]}
		/>
	);
}
