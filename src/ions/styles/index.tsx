import React from "react";
import { css, Global } from "@emotion/react";

export const globalStyle = (
	<Global
		styles={css`
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			html {
				height: 100%;
				font-size: 16px;
			}

			body {
				height: 100%;
				margin: 0;
				font-size: 1rem;
			}
			#__next {
				display: contents;
			}
		`}
	/>
);
