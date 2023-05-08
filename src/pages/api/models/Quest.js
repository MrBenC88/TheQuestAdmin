// models/Quest.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskStatus: {
    type: String,
    enum: ["complete", "incomplete", "inprogress"],
    default: "inprogress",
  },
  taskType: {
    type: String,
    enum: ["daily", "weekly", "monthly", "oneoff", "nodeadline"],
    default: "nodeadline",
    required: true,
  },
});

const questSchema = new mongoose.Schema({
  questName: { type: String, required: true },
  questDescription: { type: String, required: true },
  questImage: { type: String, required: false },
  questType: {
    type: String,
    enum: ["daily", "weekly", "monthly", "oneoff", "nodeadline"],
    required: true,
  },
  questStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  questPermissions: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  questCreator: { type: String, required: true },
  questCreatorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  questTasks: [taskSchema],
  questColor: { type: String, required: true },
  punishment: Number,
  reward: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  inviteCode: {
    type: String,
    required: true,
    unique: true,
  },
});

let Quest;
try {
  Quest = mongoose.model("Quest");
} catch (error) {
  Quest = mongoose.model("Quest", questSchema);
}

export default Quest;
