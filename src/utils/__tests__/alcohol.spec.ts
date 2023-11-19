import { expect, it } from "vitest";

import { generateAlcoholEtherCube, type Axis } from "../alcohol";

it("generate cube", () => {
  const hMax = 2;
  const hAxis: Axis = {
    type: "po",
    max: hMax,
    min: 0,
    step: 1,
  };
  const vMax = 1;
  const vAxis: Axis = {
    type: "eo",
    max: vMax,
    min: 0,
    step: 1,
  };
  const zAxis: Axis = {
    type: "alcohol",
    max: 6,
    min: 6,
    step: 1,
  };
  const cube = generateAlcoholEtherCube(hAxis, vAxis, zAxis);
  console.log(cube);
  expect(cube.length).toBe(1);
  expect(cube[0].length).toBe(vMax + 1);
  expect(cube[0][0].length).toBe(hMax + 1);
});
