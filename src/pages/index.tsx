import Head from "next/head";
import { NextPage } from "next";
import React from "react";

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			<h1>Home</h1>
		</>
	);
};

export default Page;
