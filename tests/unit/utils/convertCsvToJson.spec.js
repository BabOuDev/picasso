import convertCsvToJson from "@/utils/convertCsvToJson";
import { areArraysEqual } from "../helpers";

const exampleResult = [
  {
    title: "A title",
    description: "desc 1",
    location: "London",
    color: "Green",
    tree: "Oak",
  },
  {
    title: "3",
    description: "desc 2",
    location: "Edinburgh",
    color: "red",
    tree: "Birch",
  },
];

const createExampleCSVFile = () => {
  const CSV = [
    '"title","description","location","color","tree"',
    '"A title","desc 1","London","Green","Oak"',
    '"3","desc 2","Edinburgh","red","Birch"',
  ].join("\n");
  const contentType = "text/csv";

  return new Blob([CSV], { type: contentType });
};

describe("convertCsvToJson.js", () => {
  it("handles undefined input", async () => {
    const actualResult = await convertCsvToJson();
    const expectedResult = [];
    const areResultsEqual = areArraysEqual(actualResult, expectedResult);

    expect(areResultsEqual).toBeTruthy();
  });

  it("successfully converts csv to json", async () => {
    const file = createExampleCSVFile();
    const actualResult = await convertCsvToJson(file);

    const areResultsEqual = areArraysEqual(exampleResult, actualResult);
    expect(areResultsEqual).toBeTruthy();
  });
});
