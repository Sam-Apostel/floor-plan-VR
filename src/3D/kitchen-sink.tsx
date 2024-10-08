/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey03_1: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey03_2: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey02001_1: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey02001_2: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey01001: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey04001: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey00001_1: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey00001_2: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey03001_1: THREE.Mesh;
		Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey03001_2: THREE.Mesh;
	};
	materials: object;
};

export default function KitchenSink(props: JSX.IntrinsicElements['group']) {
	const { nodes } = useGLTF('/models/kitchen_sink.glb') as GLTFResult;

	return (
		<group {...props} dispose={null} scale={0.01}>
			<group position={[0, 4.4, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={
						nodes
							.Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey02001_1
							.geometry
					}
				>
					<meshPhysicalMaterial
						color="#222"
						metalness={0.5}
						roughness={0.35}
					/>
				</mesh>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={
					nodes
						.Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey01001
						.geometry
				}
				position={[15.3, -19.7, 1.6]}
				scale={[1.4, 1.8, 1.4]}
			>
				<meshPhysicalMaterial
					color="#eee"
					metalness={1}
					roughness={0.35}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={
					nodes
						.Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey04001
						.geometry
				}
				position={[-8.7, -15.5, 1.7]}
				scale={[1.3, 1.8, 1.3]}
			>
				<meshPhysicalMaterial
					color="#eee"
					metalness={1}
					roughness={0.35}
				/>
			</mesh>
			<group position={[-1.5, 3.8, -17.8]} rotation={[0, Math.PI / 4, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={
						nodes
							.Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey03001_1
							.geometry
					}
				>
					<meshPhysicalMaterial
						color="#222"
						metalness={0.5}
						roughness={0.35}
					/>
				</mesh>
				<mesh
					castShadow
					receiveShadow
					geometry={
						nodes
							.Blanco_Metra_6S_Compact_78x50x19sm_ALL_COLOR_dark_grey03001_2
							.geometry
					}
				>
					<meshPhysicalMaterial
						color="#222"
						metalness={0.5}
						roughness={0.35}
					/>
				</mesh>
			</group>
		</group>
	);
}
