import { ObjectId } from "mongodb";

export default class Circuit {
  constructor(
    public circuitId: number,
    public circuitRef: string,
    public name: string,
    public location: string,
    public country: string,
    public lat: number,
    public lng: number,
    public alt: number,
    public url: string,
    public _id: ObjectId
  ) {}
}
