import { degToRad } from "./geometry";

describe("degToRad", () => {
	it("should convert degrees to radians", () => {
		expect(degToRad(180)).toBe(Math.PI);
	});
});
