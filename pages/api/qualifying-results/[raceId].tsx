import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import QualifyingResult from "../../../models/qualifyingResult";

export const getRaceResult = async (
  raceId: number
): Promise<QualifyingResult[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("qualifying_result")
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
    .toArray()) as QualifyingResult[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { qualifyingResults: QualifyingResult[] }
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
    const data = await getRaceResult(+raceId as number);

    if (!data) {
      res.status(404).json({ error: "Qualifying results not found" });
    }

    res.status(200).json({ qualifyingResults: data });
  }
};
