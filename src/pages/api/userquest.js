// UserQuest API
// Handles Single UserQuest by ID

// GET /api/userquest?id=<id>: Retrieve a specific UserQuest by ID
// PUT /api/userquest?id=<id>: Update a specific UserQuest by ID
// DELETE /api/userquest?id=<id>: Delete a specific UserQuest by ID
// Please note that the <id> in the route should be replaced with the actual
// UserQuest ID when making requests.

import { connect, disconnect } from "../../../lib/mongoose";
import UserQuest from "./models/UserQuest";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connect();

  try {
    // questid
    const { id } = req.query;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid UserQuest ID" });
      return;
    }

    switch (req.method) {
      case "GET":
        await get(req, res);
        break;
      case "PUT":
        await put(req, res);
        break;
      case "DELETE":
        await deleteById(req, res);
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

// GET by mongoddb  _id and userid with optional getStatus
// TODO: Add pagination and limit size of resposne for submissionBatch
// http://localhost:3000/api/userquest?id=6458c861df25f0bb588c8e09&userId=64588a88bfde2e54575e099a
const get = async (req, res) => {
  const { id, userId, getStatus } = req.query;
  let userQuest;

  // Return only the status
  //  http://localhost:3000/api/userquest?id=6458c861df25f0bb588c8e09&userId=64588a88bfde2e54575e099a&getStatus=true
  if (getStatus === "true") {
    userQuest = await UserQuest.find({ _id: id, userId: userId })
      .select("userQuestStatus points streak")
      .exec();
  } else {
    userQuest = await UserQuest.find({ _id: id, userId: userId })
      .populate("questId")
      .exec();
  }
  // console.log(JSON.stringify(userQuest));
  res.status(200).json(userQuest);
};

// PUT by quest id

// http://localhost:3000/api/userquest?id=6458b4e2414415acbb73cb56
/** req body example. only put what needs updating
{
  "points": 2
}

 */

// The PUT request is our bread and butter. We will modify the updateData for the additional or removal
// of any of the fields in the UserQuest model.
// This is specifically useful for add/remove of the submissionBatchSchema, taskSubmissionSchema,
// or proofSchema
const put = async (req, res) => {
  const updateData = req.body;
  try {
    const updatedUserQuest = await UserQuest.findByIdAndUpdate(
      req.query.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedUserQuest);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE by id
// http://localhost:3000/api/userquest?id=6458b594414415acbb73cb64
const deleteById = async (req, res) => {
  try {
    await UserQuest.findByIdAndDelete(req.query.id);
    res.status(204).json({ message: "UserQuest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
