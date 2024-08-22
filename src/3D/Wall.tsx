import { Center, useTexture } from '@react-three/drei';
import { Mesh, MirroredRepeatWrapping, Vector2 } from 'three';
import { LinearEncoding } from '@react-three/drei/helpers/deprecated';
import { XY } from '../types';
import { useLayoutEffect, useRef } from 'react';

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
	const mesh = useRef<Mesh>(null);

	useLayoutEffect(() => {
		if (!mesh.current) return;

		const geometry = mesh.current?.geometry;

		const pos = geometry.getAttribute('position');
		const uv = geometry.getAttribute('uv');

		for (var i = 0; i < pos.count; i++) {
			var x = length * (pos.getX(i) + 0.5),
				y = height * (pos.getY(i) + 0.5),
				z = width * (pos.getZ(i) + 0.5);

			if (i < 8) uv.setXY(i, z, y);
			else if (i < 16) uv.setXY(i, x, z);
			else uv.setXY(i, y, x);
		}
		uv.needsUpdate = true;
	}, [width, height, length]);

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
		<Center top position={[x, bottom, y]} rotation={[0, angle, 0]}>
			<mesh castShadow receiveShadow ref={mesh}>
				<boxGeometry
					args={[
						length,
						height,
						width,
						length * 100,
						height * 100,
						width * 100,
					]}
				/>
				<WallMaterial />
			</mesh>
		</Center>
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

function WallMaterial({}) {
	const wallTextures = useTexture(
		{
			map: '/textures/ph-wall/diff.png',
			displacementMap: '/textures/ph-wall/disp.png',
			aoMap: '/textures/ph-wall/arm.png',
			roughnessMap: '/textures/ph-wall/arm.png',
			metalnessMap: '/textures/ph-wall/arm.png',
			normalMap: '/textures/ph-wall/nor_gl.png',
		},
		(textures) => {
			Object.values(textures).forEach((texture) => {
				texture.wrapS = MirroredRepeatWrapping;
				texture.wrapT = MirroredRepeatWrapping;
				texture.repeat = new Vector2(1, 1);
			});
		},
	);

	return (
		<meshStandardMaterial
			{...wallTextures}
			normalMap-encoding={LinearEncoding}
			displacementScale={0.002}
		/>
	);
}
