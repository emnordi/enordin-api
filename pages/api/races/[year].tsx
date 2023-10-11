import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import Race from "../../../models/race";
import NextCors from "nextjs-cors";

export const getRacesForYear = async (year: number): Promise<Race[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("race")
    .aggregate([
      {
        $lookup: {
          from: "circuit",
          localField: "circuitId",
          foreignField: "circuitId",
          as: "race",
        },
        $match: { year: year },
      },
    ])
    .sort({ round: 1 })
    .toArray()) as Race[];

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { races: Race[] }
    | { error: string }
    | { deletedCount: number }
  >
) => {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  });

  const year = req.query.year!;

  if (req.method === "GET") {
    const data = await getRacesForYear(+year as number);

    if (!data) {
      res.status(404).json({ error: "Races not found for year" + year });
    }

    res.status(200).json({ races: data });
  }
};
