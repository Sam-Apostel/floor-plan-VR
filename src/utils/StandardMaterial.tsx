import { useTexture } from '@react-three/drei';
import { LinearEncoding } from '@react-three/drei/helpers/deprecated';
import { MeshStandardMaterialProps } from '@react-three/fiber';
import { RepeatWrapping } from 'three';

export default function StandardMaterial({
	folder,
	...props
}: { folder: string } & MeshStandardMaterialProps) {
	const textures = useTexture(
		{
			map: `/textures/${folder}/diff.png`,
			aoMap: `/textures/${folder}/arm.png`,
			roughnessMap: `/textures/${folder}/arm.png`,
			metalnessMap: `/textures/${folder}/arm.png`,
			normalMap: `/textures/${folder}/nor_gl.png`,
		},
		(textures) => {
			Object.values(textures).forEach((texture) => {
				texture.wrapS = RepeatWrapping;
				texture.wrapT = RepeatWrapping;
			});
		},
	);

	return (
		<meshStandardMaterial
			{...textures}
			normalMap-encoding={LinearEncoding}
			{...props}
		/>
	);
}
