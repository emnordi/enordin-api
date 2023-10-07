import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import Circuit from "../../../models/circuit";

export const getCircuit = async (id: string | ObjectId): Promise<Circuit> => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("circuit")
    .findOne({ _id: id })) as Circuit;

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { circuit: Circuit }
    | { error: string }
    | { deletedCount: number }
  >
) => {
  const id = req.query.id!;

  if (req.method === "GET") {
    const data = await getCircuit(id as string);

    if (!data) {
      res.status(404).json({ error: "Circuit not found" });
    }

    res.status(200).json({ circuit: data });
  }
};
