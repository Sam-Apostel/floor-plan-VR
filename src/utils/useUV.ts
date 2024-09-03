import { useLayoutEffect, useRef } from 'react';
import { Mesh } from 'three';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useUV(...dependencies: any) {
	const mesh = useRef<Mesh>(null);

	useLayoutEffect(() => {
		if (!mesh.current) return;

		const geometry = mesh.current?.geometry;

		const pos = geometry.getAttribute('position');
		const uv = geometry.getAttribute('uv');

		for (let i = 0; i < pos.count; i++) {
			const x = 1 * pos.getX(i),
				y = 1 * pos.getY(i),
				z = 1 * pos.getZ(i);

			if (i < 8) uv.setXY(i, z, y);
			else if (i < 16) uv.setXY(i, x, z);
			else uv.setXY(i, y, x);
		}
		uv.needsUpdate = true;
	}, [...dependencies]);
	return mesh;
}
