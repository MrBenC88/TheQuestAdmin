//   Quest API
// This handles the global quest list of both private and public quests
// pages/api/quests.js
import { connect, disconnect } from "../../../lib/mongoose";
import Quest from "./models/Quest";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connect();

  try {
    const { _id } = req.query;
    if (_id && !mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({ error: "Invalid Quest ID" });
      return;
    }

    switch (req.method) {
      // For fetching public quests: /api/quests or /api/quests?private=false
      // http://localhost:3000/api/quests?private=true
      // http://localhost:3000/api/quests?private=false

      // default public
      // http://localhost:3000/api/quests
      case "GET":
        try {
          const { private: isPrivate } = req.query;

          let query = {};
          if (isPrivate === "true") {
            query.questPermissions = "private";
          } else {
            query.questPermissions = "public";
          }

          const quests = await Quest.find(query);
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

          let newQuest = req.body;

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

      // For updating a quest: /api/quests?_id=QUESTID
      // http://localhost:3000/api/quests?_id=64575df33b391f570d0541ee
      case "PUT":
        try {
          if (!_id) {
            throw new Error("Quest ID is missing");
          }

          const updatedQuest = req.body;

          const quest = await Quest.findByIdAndUpdate(
            _id,
            { $set: updatedQuest },
            { new: true, runValidators: true }
          );

          if (!quest) {
            res.status(404).json({ error: "Quest not found" });
          } else {
            res.status(200).json({ quest });
          }
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while updating the quest" });
        }
        break;

      // For deleting a quest: /api/quests?_id=QUESTID
      // http://localhost:3000/api/quests?_id=645759da3b391f570d0541ab
      case "DELETE":
        try {
          if (!_id) {
            throw new Error("Quest ID is missing");
          }

          const result = await Quest.findByIdAndDelete(_id);

          if (!result) {
            res.status(404).json({ error: "Quest not found" });
          } else {
            res.status(200).json({ message: "Quest deleted successfully" });
          }
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while deleting the quest" });
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
