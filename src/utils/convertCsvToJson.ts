import mapRenderKeysToObjects from "@/utils/mapRenderKeysToObjects";
import readSingleFile from "@/utils/readSingleFile";
import csv from "csvtojson";

const isFileValidCsv = (file: File) => {
  if (!file) {
    return false;
  }

  const { type } = file;
  const validTypes = ["text/csv"];

  return validTypes.includes(type);
};

const convertCsvStringToJson = (csvContents: string) => {
  return new Promise((resolve, reject) => {
    const results: object[] = [];

    csv()
      .fromString(csvContents)
      .subscribe(jsonObj => {
        results.push(jsonObj);
      })
      .on("done", () => {
        resolve(results);
      })
      .on("error", () => {
        reject([]);
      });
  });
};

/**
 *
 * @param file - Converts CSV file into an array of objects
 * @param shouldAddRenderKeys - (optional) useful for list rendering
 */
const convertCsvToJson = async (file: File, shouldAddRenderKeys = false) => {
  if (!isFileValidCsv(file)) {
    return [];
  }

  const cvsContents = (await readSingleFile(file)) as string;
  const dataSet = (await convertCsvStringToJson(cvsContents)) as Array<object>;

  if (shouldAddRenderKeys) {
    return mapRenderKeysToObjects(dataSet);
  }

  return dataSet;
};

export default convertCsvToJson;
