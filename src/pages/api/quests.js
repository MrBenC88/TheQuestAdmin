//   Quest API
// pages/api/quests.js
import { connect, disconnect } from "../../../lib/mongoose";
import Quest from "./models/Quest";

export default async function handler(req, res) {
  await connect();

  try {
    switch (req.method) {
      case "GET":
        try {
          const quests = await Quest.find({ questPermissions: "public" });
          res.status(200).json({ quests });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while fetching the quests" });
        }
        break;

      case "POST":
        try {
          if (!req.body) {
            throw new Error("Request body is missing");
          }

          const newQuest = req.body;

          const quest = new Quest(newQuest);
          await quest.save();

          res.status(201).json({ quest });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while creating the quest" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } finally {
    await disconnect();
  }
}
