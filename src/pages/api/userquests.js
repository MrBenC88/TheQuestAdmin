// UserQuests API
// Handles UserQuests
// GET by userId -- Retrieve a list of all UserQuests for a specific user
// POST by userId -- Add a new UserQuest for a user

// For user quest specific methods we will use userquest.js

import { connect, disconnect } from "../../../lib/mongoose";
import UserQuest from "./models/UserQuest";
import Quest from "./models/Quest";
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
  }
}

// GET by userId
// TODO: Add pagination and limit size of resposne for submissionBatch
// http://localhost:3000/api/userquests?userId=64588a88bfde2e54575e099a

// GET by userId with questList=true
// This returns the list of questIds for the user's quests. It is unique and it's purpose is to help
// filter frontend quest lists to only show quests that the user has not already joined.
// http://localhost:3000/api/userquests?userId=64588a88bfde2e54575e099a&questList=true
const get = async (req, res) => {
  const { questList } = req.query;

  const userQuests = await UserQuest.find({ userId: req.query.userId })
    .populate("questId") // Add this line to populate the specific quest
    .exec(); // Use exec() to execute the query

  if (questList === "true") {
    const activeQuestIds = userQuests
      .filter((userQuest) => userQuest.userQuestStatus !== "cancelled")
      .map((userQuest) => userQuest.questId._id);

    const uniqueActiveQuestIds = [...new Set(activeQuestIds)];
    res.status(200).json(uniqueActiveQuestIds);
  } else {
    // const activeQuests = userQuests.filter(
    //   (userQuest) => userQuest.userQuestStatus !== "cancelled"
    // );
    res.status(200).json(userQuests);
  }
};

// POST by userId
// Creates initial UserQuest for a user and adds it to the userquests collection
// Put QuestId in body
// http://localhost:3000/api/userquests?userId=64588a88bfde2e54575e099a
/** Example
{
  "questId": "645766c8913871c1773f6cfc"
}
 */

const post = async (req, res) => {
  const { questId } = req.body;

  // Retrieve the Quest and its tasks
  const quest = await Quest.findById(questId).exec();

  // Create an initial taskSubmissions array based on the tasks found in the questTasks array
  let taskSubmissions = quest.questTasks.map((task) => ({
    taskId: task._id,
    completed: false,
    proof: {
      type: "auto",
      value: "",
      submittedAt: null,
    },
    updatedAt: Date.now(),
    questId: questId,
  }));

  const newSubmissionBatch = {
    userId: req.query.userId,
    questId: questId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    taskSubmissions: taskSubmissions,
  };

  const newUserQuest = {
    userId: req.query.userId,
    questId: questId,
    startDate: Date.now(),
    userQuestStatus: "inprogress",
    points: 0,
    streak: 0,
    submissionBatches: [newSubmissionBatch], // Update the newUserQuest with the generated taskSubmissions
  };

  try {
    const userQuest = await UserQuest.create(newUserQuest);
    res.status(201).json(userQuest);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error: " + error });
  }
};
