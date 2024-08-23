import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { GroupProps } from '@react-three/fiber';

type GLTFResult = GLTF & {
	nodes: {
		Cube_1: THREE.Mesh;
		Cube_2: THREE.Mesh;
	};
	materials: {
		['Material.001']: THREE.MeshPhysicalMaterial;
		['Material.003']: THREE.MeshPhysicalMaterial;
	};
};

export function Desk(props: GroupProps) {
	const { nodes, materials } = useGLTF(
		'/models/Hermes White Desk.glb',
	) as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<group position={[0, 0.4, 0]} scale={[1, 0.6, 1]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube_1.geometry}
					material={materials['Material.001']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube_2.geometry}
					material={materials['Material.003']}
				/>
			</group>
		</group>
	);
}
