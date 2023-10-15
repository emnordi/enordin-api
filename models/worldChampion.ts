import { ObjectId } from "mongodb";

export default class WorldChampion {
  constructor(public year: number, public driverId: number, public _id: ObjectId) {}
}
