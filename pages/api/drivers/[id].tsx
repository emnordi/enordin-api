import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import Driver from "../../../models/driver";

export const getDriver = async (id: string | ObjectId): Promise<Driver> => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("driver")
    .findOne({ _id: id })) as Driver;

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { driver: Driver }
    | { error: string }
    | { deletedCount: number }
  >
) => {
  const id = req.query.id!;

  if (req.method === "GET") {
    const data = await getDriver(id as string);

    if (!data) {
      res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ driver: data });
  }
};
