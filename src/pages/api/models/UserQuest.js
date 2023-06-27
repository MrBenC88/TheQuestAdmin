// models/UserQuest.js
// Model for UserQuest which is the collection that users add quests from global quest collection to their profile

import mongoose from "mongoose";

const proofSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["photo", "video", "text", "auto"],
      required: false,
    },
    value: { type: String, required: false },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const taskSubmissionSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  completed: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

// This schema is for the task submission.
// It will be when a user submits a task for a quest we update this.
const submissionBatchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Quest",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, required: true },
  taskSubmissions: [taskSubmissionSchema],
  proof: [proofSchema],
});

// Upon clicking into a quest from their userquest list
// we will need to fetch the quest details from the global quest collection
// with the quest id from the userquest collection
// taskSubmissions will be an array of the batchSubmission
const userQuestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Quest",
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: false },
  userQuestStatus: {
    type: String,
    enum: ["complete", "incomplete", "inprogress", "cancelled"],
    default: "inprogress",
  },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastSubmitted: { type: Date },
  submissionBatches: [submissionBatchSchema],
});

let UserQuest;
try {
  UserQuest = mongoose.model("UserQuest");
} catch (error) {
  UserQuest = mongoose.model("UserQuest", userQuestSchema);
}

export default UserQuest;
