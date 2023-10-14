import { ObjectId } from "mongodb";
import Constructor from "./constructor";

export default class ConstructorStanding {
  constructor(
    public constructorStandingsId: number,
    public raceId: number,
    public constructorId: number,
    public points: number,
    public position: number,
    public positionText: string,
    public wins: number,
    public team: Constructor,
    public _id: ObjectId
  ) {}
}
