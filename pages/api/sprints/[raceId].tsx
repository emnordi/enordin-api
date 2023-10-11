import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import Sprint from "../../../models/sprint";

export const getCircuit = async (raceId: number): Promise<Sprint[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("sprint_result")
    .find({ raceId: raceId })
    .toArray()) as Sprint[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { sprintResults: Sprint[] }
    | { error: string }
    | { deletedCount: number }
  >
) => {
  const raceId = req.query.raceId!;

  if (req.method === "GET") {
    const data = await getCircuit(+raceId as number);

    if (!data) {
      res.status(404).json({ error: "Sprint result not found" });
    }

    res.status(200).json({ sprintResults: data });
  }
};
