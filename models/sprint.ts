import { ObjectId } from "mongodb";
import Race from "./race";

export default class Sprint {
  constructor(
    public resultId: number,
    public raceId: number,
    public driverId: number,
    public constructorId: number,
    public number: number,
    public grid: number,
    public position: number,
    public positionText: string,
    public positionOrder: number,
    public points: number,
    public laps: number,
    public time: string,
    public milliseconds: number,
    public fastestLap: number,
    public fastestLapTime: string,
    public statusId: number,
    public race: Race,
    public _id: ObjectId
  ) {}
}
