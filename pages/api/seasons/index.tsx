import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import Season from "../../../models/season";

type Return = {
  seasons: Season[];
};

export const getSeasons = async (): Promise<Season[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("season")
    .find()
    .toArray()) as Season[];

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
    const data = await getSeasons();
    res.status(200).json({ seasons: data });
  }
};
