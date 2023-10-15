import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import RaceResult from "../../../models/raceResult";
import NextCors from "nextjs-cors";

export const getRaceResult = async (driverId: number): Promise<RaceResult[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("race_result")
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
        $lookup: {
          from: "constructor",
          localField: "constructorId",
          foreignField: "constructorId",
          as: "team",
        },
      },
      {
        $match: {
          driverId: driverId,
        },
      },
      {
        $unwind: "$driver",
      },
      {
        $unwind: "$team",
      },
    ])
    .toArray()) as RaceResult[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    { modifiedCount: number } | { raceResults: RaceResult[] } | { error: string } | { deletedCount: number }
  >
) => {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  });
  const driverId = req.query.driverId!;

  if (req.method === "GET") {
    const data = await getRaceResult(+driverId as number);

    if (!data) {
      res.status(404).json({ error: "Race result not found" });
    }

    res.status(200).json({ raceResults: data });
  }
};
