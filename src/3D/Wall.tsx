import { Center } from '@react-three/drei';
import { XY } from '../types';

import useUV from '../utils/useUV';
import StandardMaterial from '../utils/StandardMaterial';
// import { Door } from './Door';

export function Wall({
	start,
	end,
	height,
	width,
	door,
}: {
	start: XY;
	end: XY;
	height: number;
	width: number;
	door?: { distance: number; width: number; height: number };
}) {
	const diff = {
		x: end.x - start.x,
		y: end.y - start.y,
	};

	const center = {
		x: end.x - diff.x / 2,
		y: end.y - diff.y / 2,
	};

	const length = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
	const angle = Math.atan2(diff.y, diff.x);

	return (
		<>
			<WallSection
				width={width}
				height={height}
				length={length}
				angle={angle}
				{...center}
				door={door}
			/>
		</>
	);
}

function WallSection({
	width,
	height,
	length,
	angle = 0,
	bottom = 0,
	x = 0,
	y = 0,
	door,
}: WallSectionProps) {
	const mesh = useUV(length, width, height);

	if (door) {
		const endLength = length - door.width - door.distance;
		return (
			<Center top rotation={[0, angle, 0]} position={[x, 0, y]}>
				<WallSection
					width={width}
					height={height}
					length={door.distance}
					x={door.distance / 2}
				/>
				<WallSection
					width={width}
					height={height - door.height}
					bottom={door.height}
					length={door.width}
					x={door.distance + door.width / 2}
				/>
				{/* <Door
					rotation={[0, Math.PI / 2, 0]}
					position={[door.distance + door.width / 2, 0, 0]}
				/> */}
				<WallSection
					height={height}
					width={width}
					length={endLength}
					x={door.distance + door.width + endLength / 2}
				/>
			</Center>
		);
	}

	return (
		<>
			{bottom === 0 && (
				<>
					<Center top position={[x, 0, y]} rotation={[0, angle, 0]}>
						<Baseboard length={length} offset={width / 2} />

						<Baseboard
							length={length}
							offset={width / 2}
							negativeOffset
						/>
					</Center>
					<Center
						top
						position={[x, 0, y]}
						rotation={[0, angle - Math.PI / 2, 0]}
					>
						<Baseboard length={width + 0.02} offset={length / 2} />
						<Baseboard
							length={width + 0.02}
							offset={length / 2}
							negativeOffset
						/>
					</Center>
				</>
			)}
			{length > 0 && (
				<Center top position={[x, bottom, y]} rotation={[0, angle, 0]}>
					<mesh castShadow receiveShadow ref={mesh}>
						<boxGeometry args={[length, height, width]} />
						<StandardMaterial folder="wall" />
					</mesh>
				</Center>
			)}
		</>
	);
}

type WallSectionProps = {
	width: number;
	height: number;
	length: number;
	angle?: number;
	bottom?: number;
	x?: number;
	y?: number;

	door?: { distance: number; width: number; height: number };
};

function Baseboard({
	length,
	offset,
	negativeOffset = false,
}: {
	length: number;
	offset: number;
	negativeOffset?: boolean;
}) {
	const meshRef = useUV(length);
	return (
		<mesh
			ref={meshRef}
			position={[
				0,
				0,
				0.005 + (0.005 + offset) * (negativeOffset ? -1 : 1),
			]}
		>
			<boxGeometry args={[length, 0.1, 0.01]} />
			<StandardMaterial folder="oak-veneer" />
		</mesh>
	);
}
