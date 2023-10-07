import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import Season from "../../../models/season";

export const getSeason = async (id: string | ObjectId): Promise<Season> => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("season")
    .findOne({ _id: id })) as Season;

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { season: Season }
    | { error: string }
    | { deletedCount: number }
  >
) => {
  const id = req.query.id!;

  if (req.method === "GET") {
    const data = await getSeason(id as string);

    if (!data) {
      res.status(404).json({ error: "Season not found" });
    }

    res.status(200).json({ season: data });
  }
};
