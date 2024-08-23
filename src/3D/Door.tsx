/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		Cube157: THREE.Mesh;
		Cube157_1: THREE.Mesh;
		Cube157_2: THREE.Mesh;
	};
	materials: {
		Door_colors: THREE.MeshStandardMaterial;
		['Material.001']: THREE.MeshStandardMaterial;
		Hinge: THREE.MeshStandardMaterial;
	};
};

export function Door(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF(
		'/models/Single Door with Molds.glb',
	) as GLTFResult;

	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube157.geometry}
				material={materials.Door_colors}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube157_1.geometry}
				material={materials['Material.001']}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube157_2.geometry}
				material={materials.Hinge}
			/>
		</group>
	);
}

useGLTF.preload('/Door1.glb');
