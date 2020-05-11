import chunkArray from "@/utils/chunkArray";
import { areArraysEqual } from "../helpers";

const oddSizedArray = [1, 2, 3, 4, 5, 6, 7];
const evenSizedArray = [1, 2, 3, 4];

describe("chunkArray.js", () => {
  it("array size is even number > splits into equal chunks", () => {
    const expectedResult = [
      [1, 2],
      [3, 4],
    ];
    const result = chunkArray(evenSizedArray, 2);

    expect(areArraysEqual(result, expectedResult)).toBeTruthy();
  });

  it("array size is even number > splits into inequal chunks", () => {
    const expectedResult = [[1, 2, 3], [4, 5, 6], [7]];
    const result = chunkArray(oddSizedArray, 3);

    expect(areArraysEqual(result, expectedResult)).toBeTruthy();
  });
});
