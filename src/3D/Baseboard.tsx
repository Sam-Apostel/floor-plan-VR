import { Center } from '@react-three/drei';
import { Vector2 } from 'three';
import { XY } from '../types';
import StandardMaterial from '../utils/StandardMaterial';

export default function Baseboards({ points }: { points: Array<XY> }) {
	const [, ...baseboards] = points.map((b, i, points) => {
		if (i === 0) return null;
		const a = points[i - 1];

		const normal = new Vector2(b.x - a.x, b.y - a.y);
		const center = new Vector2(a.x + normal.x / 2, a.y + normal.y / 2);

		return {
			position: center,
			length: normal.length(),
			angle: normal.angleTo(new Vector2(1, 0)) - Math.PI / 2,
		};
	});

	return (
		<group>
			{baseboards.map((baseboard, i) => (
				<Baseboard key={i} {...baseboard!} />
			))}
		</group>
	);
}

function Baseboard({
	position,
	length,
	angle,
}: {
	position: Vector2;
	length: number;
	angle: number;
}) {
	return (
		<group rotation={[0, angle, 0]} position={[position.x, 0, position.y]}>
			<mesh position={[0.005, 0.05, 0]}>
				<boxGeometry args={[0.01, 0.1, length + 0.02]} />
				<StandardMaterial folder="oak-veneer" />
			</mesh>
		</group>
	);
}
