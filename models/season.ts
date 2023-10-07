import { ObjectId } from "mongodb";

export default class Season {
  constructor(public year: number, public url: string, public _id: ObjectId) {}
}
