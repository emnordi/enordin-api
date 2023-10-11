import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import Race from "../../../models/race";

export const getRacesForYear = async (year: number): Promise<Race[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db("f1db")
    .collection("race")
    .find({ year: year })
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
  const year = req.query.year!;

  if (req.method === "GET") {
    const data = await getRacesForYear(+year as number);

    if (!data) {
      res.status(404).json({ error: "Races not found for year" + year });
    }

    res.status(200).json({ races: data });
  }
};
