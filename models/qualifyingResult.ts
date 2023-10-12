import { ObjectId } from "mongodb";
import Driver from "./driver";

export default class QualifyingResult {
  constructor(
    public qualifyId: number,
    public raceId: number,
    public driverId: number,
    public constructorId: number,
    public number: number,
    public position: number,
    public driver: Driver,
    public _id: ObjectId
  ) {}
}
