import { ObjectId } from "mongodb";
import Race from "./race";
import Constructor from "./constructor";

export default class SprintResult {
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
    public team: Constructor,
    public _id: ObjectId
  ) {}
}
