export default class BaseModel {
  constructor(obj: object) {
    Object.assign(this, obj);
  }
}
