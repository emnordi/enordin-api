import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import NextCors from "nextjs-cors";
import ConstructorStanding from "../../../models/constructorStanding";

export const getConstructorStandings = async (
  raceId: number
): Promise<ConstructorStanding[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("constructor_standing")
    .aggregate([
      {
        $lookup: {
          from: "constructor",
          localField: "constructorId",
          foreignField: "constructorId",
          as: "team",
        },
      },
      {
        $match: {
          raceId: raceId,
        },
      },
      {
        $unwind: "$team",
      },
    ])
    .sort({ position: 1 })
    .toArray()) as ConstructorStanding[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { constructorStandings: ConstructorStanding[] }
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
    const data = await getConstructorStandings(+raceId as number);

    if (!data) {
      res.status(404).json({ error: "Constructor standings not found" });
    }

    res.status(200).json({ constructorStandings: data });
  }
};
