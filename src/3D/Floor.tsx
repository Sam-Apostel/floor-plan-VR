import { XY } from '../types';
import { BackSide, Shape, Vector2 } from 'three';
import StandardMaterial from '../utils/StandardMaterial';

export default function Floor({ points }: { points: Array<XY> }) {
	const vertices = points.map((point) => new Vector2(point.x, point.y));
	const shape = new Shape(vertices);

	return (
		<group>
			<mesh
				castShadow
				receiveShadow
				rotation={[Math.PI / 2, 0, 0]}
				position={[0, 0.001, 0]}
			>
				<shapeGeometry args={[shape, 10]} />
				<StandardMaterial folder="laminate" side={BackSide} />
			</mesh>
		</group>
	);
}
