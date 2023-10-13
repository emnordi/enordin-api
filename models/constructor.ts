import { ObjectId } from "mongodb";

export default class Constructor {
  constructor(
    public constructorId: number,
    public constructorRef: string,
    public name: string,
    public nationality: string,
    public url: string,
    public _id: ObjectId
  ) {}
}
