import { degToRad } from "@/ions/utils/geometry";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import { useGLTF } from "@react-three/drei";
import React, { Suspense, useRef } from "react";
import { BufferGeometry, Material } from "three";
interface FixIt {
	nodes: Record<string, { geometry: BufferGeometry; material: Material }>;
	materials: Record<string, Material>;
}
const Model = props => {
	const group = useRef();
	const { nodes, materials } = useGLTF(
		"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf"
	) as unknown as FixIt;
	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				geometry={nodes.character_bear.geometry}
				material={nodes.character_bear.material}
				rotation={[degToRad(90), 0, 0]}
			>
				<mesh
					geometry={nodes.character_bearArmLeft.geometry}
					material={nodes.character_bearArmLeft.material}
					position={[0.2, 0, -0.63]}
				/>
				<mesh
					geometry={nodes.character_bearArmRight.geometry}
					material={nodes.character_bearArmRight.material}
					position={[-0.2, 0, -0.63]}
				/>
				<group position={[0, 0, -0.7]}>
					<mesh geometry={nodes.Cube1337.geometry} material={materials["Black.025"]} />
					<mesh
						geometry={nodes.Cube1337_1.geometry}
						material={nodes.Cube1337_1.material}
					/>
				</group>
			</mesh>
		</group>
	);
};
useGLTF.preload(
	"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf"
);

const Page: NextPage = () => {
	return (
		<Canvas>
			<color attach="background" args={["hsl(0, 0%, 100%)"]} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<Model />
			</Suspense>
		</Canvas>
	);
};

export default Page;
