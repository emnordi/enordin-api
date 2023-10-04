import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Driver from "../models/driver";

export const driverRouter = express.Router();

driverRouter.use(express.json());

driverRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const games = (await collections?.drivers?.find({}).toArray()) as Driver[];

    res.status(200).send(games);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

driverRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const game = (await collections?.drivers?.findOne(query)) as Driver;

    if (game) {
      res.status(200).send(game);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});
