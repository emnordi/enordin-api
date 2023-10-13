import { ObjectId } from "mongodb";
import Driver from "./driver";
import Constructor from "./constructor";

export default class QualifyingResult {
  constructor(
    public qualifyId: number,
    public raceId: number,
    public driverId: number,
    public constructorId: number,
    public number: number,
    public position: number,
    public driver: Driver,
    public team: Constructor,
    public _id: ObjectId
  ) {}
}
