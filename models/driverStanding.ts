import { ObjectId } from "mongodb";
import Driver from "./driver";

export default class DriverStanding {
  constructor(
    public driverStandingsId: number,
    public raceId: number,
    public driverId: number,
    public points: number,
    public position: number,
    public positionText: string,
    public wins: number,
    public driver: Driver,
    public _id: ObjectId
  ) {}
}
