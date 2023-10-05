import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import Driver from "../../../models/driver";

type Return = {
  drivers: Driver[];
};

export const getDrivers = async (): Promise<Driver[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("driver")
    .find()
    .toArray()) as Driver[];

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
    const data = await getDrivers();
    res.status(200).json({ drivers: data });
  }
};
