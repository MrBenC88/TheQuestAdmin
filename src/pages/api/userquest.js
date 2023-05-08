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

    /**
     * 
Note that we have many layers to our json entries. 
Everything is easy to update with the userquest PUT req and get req. 

However we need queries that provide more info. 

Please implement 
GET routes
- Get submissionBatchSchema entry of a userQuest of given questId, also have an 
optional date param that will return the most recent createdat. 
- Get a specific task in the submissionBatchschema entry given questId and taskId
- Get a specific proofSchema entry given taskid, questid

PUT routes
- update an entry in the userQuestSchema  
- update an entry in the submissionBatchSchema 
- update a proofschema entry in the tasksubmissionschema

DELETE routes
- delete an entry in the userQuestSchema  
- delete an entry in the submissionBatchSchema 
- delete  a proofschema entry in the tasksubmissionschema
     */

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

// GET by id
// http://localhost:3000/api/userquest?id=6458b4e2414415acbb73cb56
const get = async (req, res) => {
  const userQuest = await UserQuest.findById(req.query.id);
  res.status(200).json(userQuest);
};

// PUT by quest id

// http://localhost:3000/api/userquest?id=6458b4e2414415acbb73cb56
/** req body example. only put what needs updating
{
  "points": 2
}

 */
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
