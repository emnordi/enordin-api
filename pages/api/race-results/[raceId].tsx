import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import RaceResult from "../../../models/raceResult";
import NextCors from "nextjs-cors";

export const getRaceResult = async (raceId: number): Promise<RaceResult[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("race_result")
    .find({ raceId: raceId })
    .toArray()) as RaceResult[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { raceResults: RaceResult[] }
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
      res.status(404).json({ error: "Race result not found" });
    }

    res.status(200).json({ raceResults: data });
  }
};
