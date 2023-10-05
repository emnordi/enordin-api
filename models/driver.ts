import { ObjectId } from "mongodb";

export default class Driver {
  constructor(
    public driverId: number,
    public driverRef: string,
    public number: number,
    public code: string,
    public forename: string,
    public surname: string,
    public dob: Date,
    public nationality: string,
    public url: string,
    public _id: ObjectId
  ) {}
}
