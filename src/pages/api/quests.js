//   Quest API
// pages/api/quests.js
import { connectToDatabase } from "../../../lib/mongodb";
// import Quest from "./models/Quest";

export default async function handler(req, res) {
  const db = await connectToDatabase();

  switch (req.method) {
    case "GET":
      // Fetch global quests
      try {
        const quests = await db
          .collection("quests")
          .find({ questPermissions: "public" })
          .toArray();
        res.status(200).json({ quests });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching the quests" });
      }
      break;

    case "POST":
      // Create a new global quest
      try {
        if (!req.body) {
          throw new Error("Request body is missing");
        }

        const newQuest = req.body;

        const result = await db.collection("quests").insertOne(newQuest);

        res.status(201).json({ quest: result });
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
}
