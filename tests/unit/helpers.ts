export const areArraysEqual = (array1: any[], array2: any[]): boolean => {
  return array1.every((itemArray1, index) => {
    const itemArray2 = array2[index];

    if (Array.isArray(itemArray1) && Array.isArray(itemArray2)) {
      const areArraysEqualLength = itemArray1.length === itemArray2.length;
      return areArraysEqualLength && areArraysEqual(itemArray1, itemArray2);
    }

    if (typeof itemArray1 === "object" && typeof itemArray2 === "object") {
      return areObjectsEqual(itemArray1, itemArray2);
    }

    return itemArray1 === itemArray2;
  });
};

interface Obj {
  [key: string]: any;
}

export const areObjectsEqual = (object1: Obj, object2: Obj): boolean => {
  return Object.keys(object1).every(key => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (Array.isArray(value1) && Array.isArray(value2)) {
      return areArraysEqual(value1, value2);
    }

    return value1 === value2;
  });
};

export default {
  areArraysEqual,
  areObjectsEqual,
};
