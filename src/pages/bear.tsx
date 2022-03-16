import { degToRad } from "@/ions/utils/geometry";
import { Canvas, useFrame } from "@react-three/fiber";
import { NextPage } from "next";
import { useGLTF } from "@react-three/drei";
import React, { Suspense, useRef } from "react";
import { BufferGeometry, Group, Material, Mesh } from "three";
interface FixIt {
	nodes: Record<string, { geometry: BufferGeometry; material: Material }>;
	materials: Record<string, Material>;
}
const Model = props => {
	const group = useRef();
	const armLeft = useRef<Mesh>();
	const armRight = useRef<Mesh>();
	const head = useRef<Group>();
	const { nodes, materials } = useGLTF(
		"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf"
	) as unknown as FixIt;
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		const moveRight = Math.sin(time * 2);
		const moveLeft = Math.sin(time * -2);
		const moveHead = Math.cos(time);
		armRight.current.rotation.x = moveRight;
		armLeft.current.rotation.x = moveLeft;
		head.current.rotation.z = moveHead / 5;
		head.current.rotation.y = moveHead / -10;
	});
	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				geometry={nodes.character_bear.geometry}
				material={nodes.character_bear.material}
				rotation={[degToRad(90), 0, 0]}
			>
				<mesh
					ref={armLeft}
					geometry={nodes.character_bearArmLeft.geometry}
					material={nodes.character_bearArmLeft.material}
					position={[0.2, 0, -0.63]}
				/>
				<mesh
					ref={armRight}
					geometry={nodes.character_bearArmRight.geometry}
					material={nodes.character_bearArmRight.material}
					position={[-0.2, 0, -0.63]}
				/>
				<group ref={head} position={[0, 0, -0.7]}>
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
