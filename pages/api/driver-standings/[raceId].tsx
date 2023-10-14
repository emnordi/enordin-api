import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import DriverStanding from "../../../models/driverStanding";

export const getDriverStandings = async (
  raceId: number
): Promise<DriverStanding[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("driver_standing")
    .aggregate([
      {
        $lookup: {
          from: "driver",
          localField: "driverId",
          foreignField: "driverId",
          as: "driver",
        },
      },
      {
        $match: {
          raceId: raceId,
        },
      },
      {
        $unwind: "$driver",
      },
    ])
    .toArray()) as DriverStanding[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { driverStandings: DriverStanding[] }
    | { error: string }
    | { deletedCount: number }
  >
) => {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  });
  const raceId = req.query.raceId!;

  if (req.method === "GET") {
    const data = await getDriverStandings(+raceId as number);

    if (!data) {
      res.status(404).json({ error: "Driver standings not found" });
    }

    res.status(200).json({ driverStandings: data });
  }
};
