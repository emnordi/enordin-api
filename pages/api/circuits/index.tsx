import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import Circuit from "../../../models/circuit";

type Return = {
  circuits: Circuit[];
};

export const getCircuits = async (): Promise<Circuit[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("circuit")
    .find()
    .toArray()) as Circuit[];

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
    const data = await getCircuits();
    res.status(200).json({ circuits: data });
  }
};
