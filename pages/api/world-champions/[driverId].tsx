import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import WorldChampion from "../../../models/worldChampion";

export const getRaceResult = async (driverId: number): Promise<WorldChampion[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("world_champion")
    .find({ driverId: driverId })
    .toArray()) as WorldChampion[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    { modifiedCount: number } | { worldChampions: WorldChampion[] } | { error: string } | { deletedCount: number }
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

    res.status(200).json({ worldChampions: data });
  }
};
