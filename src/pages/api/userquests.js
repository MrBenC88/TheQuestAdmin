// UserQuests API
// Handles UserQuests
// GET by userId -- Retrieve a list of all UserQuests for a specific user
// POST by userId -- Add a new UserQuest for a user

// For user quest specific methods we will use userquest.js

import { connect, disconnect } from "../../../lib/mongoose";
import UserQuest from "./models/UserQuest";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connect();

  try {
    const { userId } = req.query;
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ error: "Invalid User ID" });
      return;
    }

    switch (req.method) {
      case "GET":
        await get(req, res);
        break;
      case "POST":
        await post(req, res);
        break;
      default:
        res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await disconnect();
  }
}

// GET by userId
// http://localhost:3000/api/userquests?userId=64588a88bfde2e54575e099a
const get = async (req, res) => {
  const userQuests = await UserQuest.find({ userId: req.query.userId });
  res.status(200).json(userQuests);
};

// POST by userId
// Put QuestId in body
// http://localhost:3000/api/userquests?userId=64588a88bfde2e54575e099a
/** Example
{
  "questId": "645766c8913871c1773f6cfc"
}
 */

const post = async (req, res) => {
  const { questId } = req.body;

  const newUserQuest = {
    userId: req.query.userId,
    questId: questId,
    startDate: Date.now(),
    userQuestStatus: "inprogress",
    points: 0,
    streak: 0,
    taskSubmissions: [],
  };

  try {
    const userQuest = await UserQuest.create(newUserQuest);
    res.status(201).json(userQuest);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
