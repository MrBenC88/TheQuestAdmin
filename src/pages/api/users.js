// pages/api/user.js
import { MongoClient, ObjectId } from "mongodb";

import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  const usersCollection = db.collection("users");

  switch (req.method) {
    // Get by _id: http://localhost:3000/api/users?userId=645726347551a286cd1f33c3
    // Get by username: http://localhost:3000/api/users?username=chessben88
    // Get By email : http://localhost:3000/api/users?email=chessben88@gmail.com
    case "GET":
      try {
        const { userId, username, email } = req.query;

        if (userId) {
          const user = await usersCollection.findOne({
            _id: new ObjectId(userId),
          });
          if (!user) {
            res.status(404).json({ error: "User not found" });
          } else {
            res.status(200).json({ user });
          }
        } else if (username) {
          const user = await usersCollection.findOne({ username });
          if (!user) {
            res.status(404).json({ error: "User not found" });
          } else {
            res.status(200).json({ user });
          }
        } else if (email) {
          const user = await usersCollection.findOne({ email });
          if (!user) {
            res.status(404).json({ error: "User not found" });
          } else {
            res.status(200).json({ user });
          }
        } else {
          res
            .status(400)
            .json({ error: "Please provide userId, username, or email" });
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching the user" });
      }
      break;

    case "POST":
      // Handle POST requests here
      break;

    case "PUT":
      // Handle PUT requests here
      // we only allow authenticated users to update their own profile

      // PUT req to: http://localhost:3000/api/users

      // UPDATE by userId, username, or email only the following fields
      // name, email, image, accountType, username, bio

      /*
      Send Req Body:
      {
        "userId": "64588376bfde2e54575e098a",
        "updateData": {
            "accountType": "free",
            "bio": "Updated bio",
            "username": "touchgrass"
        }
    }

    {
        "email": "chessben88@gmail.com",
        "updateData": {
            "accountType": "free",
            "bio": "Updated bio",
            "username": "touchgrass"
        }
    }
      
      */
      try {
        const { userId, username, email, updateData } = req.body;

        // Check if the authenticated user is the owner
        // const userSession = req.session.user;

        // Filter out the allowed fields for update
        const allowedUpdates = [
          //   "name",
          //   "email",
          //   "image",
          "accountType",
          "username",
          "bio",
        ];
        const updates = Object.keys(updateData);
        const isValidUpdate = updates.every((update) =>
          allowedUpdates.includes(update)
        );

        if (!isValidUpdate) {
          res.status(400).json({ error: "Invalid updates" });
          return;
        }

        let filter = {};
        if (userId) {
          filter._id = new ObjectId(userId);
        } else if (username) {
          filter.username = username;
        } else if (email) {
          filter.email = email;
        } else {
          res
            .status(400)
            .json({ error: "Please provide userId, username, or email" });
          return;
        }

        const result = await usersCollection.updateOne(filter, {
          $set: updateData,
        });

        if (result.modifiedCount === 0) {
          res
            .status(404)
            .json({ error: "User not found or update not needed" });
        } else {
          res.status(200).json({ message: "User updated successfully" });
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while updating the user" });
      }
      break;

    case "DELETE":
      // DELETE BY userId: http://localhost:3000/api/users?userId=645726347551a286cd1f33c3
      // DELETE by username: http://localhost:3000/api/users?username=chessben88
      // DELETE by email: http://localhost:3000/api/users?email=chessben88@gmail.com
      try {
        const { userId, username, email } = req.query;

        let filter = {};
        if (userId) {
          filter._id = new ObjectId(userId);
        } else if (username) {
          filter.username = username;
        } else if (email) {
          filter.email = email;
        } else {
          res
            .status(400)
            .json({ error: "Please provide userId, username, or email" });
          return;
        }

        // Find the user document
        const user = await usersCollection.findOne(filter);
        if (!user) {
          res.status(404).json({ error: "User not found" });
          return;
        }

        // Delete the user document
        await usersCollection.deleteOne(filter);

        // Delete the account document
        const accountsCollection = db.collection("accounts");
        await accountsCollection.deleteOne({ userId: user._id });

        // Delete the session documents
        const sessionsCollection = db.collection("sessions");
        await sessionsCollection.deleteMany({ userId: user._id });

        res
          .status(200)
          .json({ message: "User and associated data deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error:
            "An error occurred while deleting the user and associated data",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
