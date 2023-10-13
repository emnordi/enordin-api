import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import SprintResult from "../../../models/sprint";

type Return = {
  sprintResults: SprintResult[];
};

export const getSprintResults = async (): Promise<SprintResult[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("sprint_result")
    .aggregate([
      {
        $lookup: {
          from: "race",
          localField: "raceId",
          foreignField: "raceId",
          as: "race",
        },
      },
    ])
    .toArray()) as SprintResult[];

  return JSON.parse(JSON.stringify(data));
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Return | ObjectId | { error: string }>
) => {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  });
  if (req.method === "GET") {
    const data = await getSprintResults();
    res.status(200).json({ sprintResults: data });
  }
};
