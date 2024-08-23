import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		OBJ_Bed_Body: Mesh;
		OBJ_Bed_Blanket: Mesh;
	};
	materials: {
		MAT_Bed_Body: MeshStandardMaterial;
		MAT_Bed_blanket: MeshStandardMaterial;
	};
};

export default function Bed(props: GroupProps) {
	const { nodes, materials } = useGLTF(
		'/models/Upholstered Bed 2k.glb',
	) as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.OBJ_Bed_Body.geometry}
				material={materials.MAT_Bed_Body}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.OBJ_Bed_Blanket.geometry}
				material={materials.MAT_Bed_blanket}
			/>
		</group>
	);
}
