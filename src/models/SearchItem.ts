import BaseModel from "@/models/BaseModel";

const convertObjToStringArray = (obj: object): string[] => {
  return Object.values(obj).map(item => {
    if (typeof item === "object") {
      return convertObjToStringArray(item);
    }

    return item;
  });
};

export default class SearchItem extends BaseModel {
  get searchTerm(): string {
    const items = convertObjToStringArray(this);
    return items.join(" ").toLowerCase();
  }
}
