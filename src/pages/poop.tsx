import { degToRad } from "@/ions/utils/geometry";
import { Canvas, Vector3 } from "@react-three/fiber";
import { LayerMaterial, Depth } from "lamina/vanilla";
import { NextPage } from "next";
import React, { Suspense } from "react";
import * as THREE from "three";
const _45Deg = degToRad(45);
const rotation: Vector3 = [_45Deg, _45Deg, 0];
const box = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new LayerMaterial({
	color: "#00f",
	transmission: 1,
	layers: [
		new Depth({
			colorA: "#f00",
			colorB: "#0f0",
			alpha: 0.9,
			mode: "divide",
			near: 0,
			far: 2,
			origin: new THREE.Vector3(1, 1, 1),
		}),
	],
});

const Page: NextPage = () => {
	return (
		<Canvas>
			<color attach="background" args={["hsl(0, 0%, 100%)"]} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<mesh rotation={rotation} geometry={box} material={material}>
					<boxGeometry args={[1, 1, 1]} />
				</mesh>
			</Suspense>
		</Canvas>
	);
};

export default Page;
