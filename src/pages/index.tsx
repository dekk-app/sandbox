import { degToRad } from "@/ions/utils/geometry";
import { Canvas, Vector3 } from "@react-three/fiber";
import { NextPage } from "next";
import React, { Suspense } from "react";
import { BoxBufferGeometry, MeshStandardMaterial } from "three";

const _45Deg = degToRad(45);
const rotation: Vector3 = [_45Deg, _45Deg, 0];
const box = new BoxBufferGeometry(1, 1, 1);
const orange = new MeshStandardMaterial({ color: "orange" });

const Page: NextPage = () => {
	return (
		<Canvas>
			<color attach="background" args={["hsl(0, 0%, 100%)"]} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<mesh rotation={rotation} geometry={box} material={orange}>
					<boxGeometry args={[1, 1, 1]} />
				</mesh>
			</Suspense>
		</Canvas>
	);
};

export default Page;
