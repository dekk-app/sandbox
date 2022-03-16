import { Text, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { NextPage } from "next";
import React, { useRef } from "react";
import { BufferGeometry, Group, Material } from "three";

interface FixIt {
	nodes: Record<string, { geometry: BufferGeometry; material: Material }>;
	materials: Record<string, Material>;
}

const Model = props => {
	const ref = useRef<Group>();
	const { nodes, materials } = useGLTF(
		"https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/ice-cream-truck/model.gltf"
	) as unknown as FixIt;
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		ref.current.rotation.y = time / 4;
	});
	return (
		<group ref={ref} {...props} dispose={null}>
			<mesh
				geometry={nodes.Ice_Cream_Truck.geometry}
				material={materials["Ice Cream Truck Material"]}
				position={[-0.05, 0.86, -0.1]}
			/>
		</group>
	);
};

useGLTF.preload(
	"https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/ice-cream-truck/model.gltf"
);

const Page: NextPage = () => {
	return (
		<Canvas>
			<color attach="background" args={["#06c"]} />
			<ambientLight intensity={0.1} />
			<pointLight position={[0, 50, 10]} intensity={4} />
			<Model position={[-3, -1, 0]} />
			<Text
				position={[3, 2, 0]}
				color="#fff"
				anchorX="center"
				anchorY="middle"
				maxWidth={6}
				fontSize={1.5}
			>
				Icecream
			</Text>
			<Text
				position={[3, -1, 0]}
				color="#fff"
				anchorX="center"
				anchorY="middle"
				maxWidth={6}
				fontSize={0.75}
			>
				I scream, you scream, we all scream for icecream
			</Text>
		</Canvas>
	);
};

export default Page;
