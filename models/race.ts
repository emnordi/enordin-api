import { ObjectId } from "mongodb";

export default class Race {
  constructor(
    public raceId: number,
    public year: number,
    public round: number,
    public circuitId: number,
    public name: string,
    public date: Date,
    public time: string,
    public url: string,
    public fp1_date: Date,
    public fp1_time: string,
    public fp2_date: Date,
    public fp2_time: string,
    public fp3_date: Date,
    public fp3_time: string,
    public quali_date: Date,
    public quali_time: string,
    public sprint_date: Date,
    public sprint_time: string,
    public _id: ObjectId
  ) {}
}
