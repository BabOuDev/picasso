import { v1 as uuidv1 } from "uuid";

/**
 * Adds a renderKey to each object in an array.
 * Useful for specifing keys for data with unknown schema.
 * @param arr - An array of objects
 */
const mapRenderKeysToObjects = (arr: object[]) => {
  return arr.map(item => ({ ...item, renderKey: uuidv1() }));
};

export default mapRenderKeysToObjects;
