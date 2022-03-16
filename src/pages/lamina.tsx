import { degToRad } from "@/ions/utils/geometry";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Color, Depth, LayerMaterial, Noise } from "lamina/vanilla";
import { NextPage } from "next";
import React, { useRef } from "react";
import { BufferGeometry, Group, Material, Mesh } from "three";
import * as THREE from "three";

const material = new LayerMaterial({
	color: "#420",
	lighting: "physical",
	transmission: 1,
	layers: [
		new Depth({
			colorA: "#fff",
			colorB: "#000",
			alpha: 0.5,
			mode: "screen",
			near: 0,
			far: 10,
			origin: new THREE.Vector3(1, 1, 1),
		}),
		new Noise({
			colorA: "#000",
			colorB: "#fff",
			colorC: "#000",
			colorD: "#fff",
			alpha: 0.2,
			scale: 10,
			mode: "multiply",
		}),
		new Noise({
			colorA: "#fff",
			colorB: "#000",
			colorC: "#333",
			colorD: "#666",
			alpha: 0.4,
			scale: 50,
			mode: "screen",
		}),
		new Color({
			color: "#420",
			mode: "reflect",
		}),
		new Color({
			color: "#420",
			mode: "multiply",
		}),
	],
});

const material2 = new THREE.MeshPhongMaterial({
	color: "#000",
	shininess: 100,
});

interface FixIt {
	nodes: Record<string, { geometry: BufferGeometry; material: Material }>;
	materials: Record<string, Material>;
}
const Model = props => {
	const group = useRef();
	const armLeft = useRef<Mesh>();
	const armRight = useRef<Mesh>();
	const head = useRef<Group>();
	const { nodes } = useGLTF(
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
				material={material}
				rotation={[degToRad(90), 0, 0]}
			>
				<mesh
					ref={armLeft}
					geometry={nodes.character_bearArmLeft.geometry}
					material={material}
					position={[0.2, 0, -0.63]}
				/>
				<mesh
					ref={armRight}
					geometry={nodes.character_bearArmRight.geometry}
					material={material}
					position={[-0.2, 0, -0.63]}
				/>
				<group ref={head} position={[0, 0, -0.7]}>
					<mesh geometry={nodes.Cube1337.geometry} material={material2} />
					<mesh geometry={nodes.Cube1337_1.geometry} material={material} />
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
			<color attach="background" args={["hsl(220, 50%, 50%)"]} />
			<ambientLight />
			<pointLight position={[0, 10, 10]} />
			<OrbitControls />
			<Model />
		</Canvas>
	);
};

export default Page;
