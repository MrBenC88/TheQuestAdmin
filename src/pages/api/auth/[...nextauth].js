// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

const callbacks = {
  session: async (session, sessionToken) => {
    // console.log("Session:", session);
    // console.log("sessionToken:", sessionToken);
    try {
      const client = await clientPromise;
      if (typeof client.db !== "function") {
        console.error("client.db is not a function");
        return Promise.resolve(session);
      }
      // console.log("CHECK!!!!!:" + client);

      const db = client.db("test");
      const userCollection = db.collection("users");

      const { name, email, image } = session.user;

      const customFields = {};

      // If the user does not have a accountType, set the default accountType
      if (!session.user.accountType) {
        customFields.accountType = "free";
      }

      // If the user does not have a bio, set the default bio
      if (!session.user.bio) {
        customFields.bio = "";
      }
      // TODO: CHECK TO ENSURE USERNAME DOESNT ALREADY EXIST FOR UPDATING USERNAME ROUTE
      // If the user does not have a username, set the default username
      if (!session.user.username) {
        customFields.username = email.split("@")[0];
      }

      const updatedUser = await userCollection.findOneAndUpdate(
        { email: email },
        { $set: { name, email, image, ...customFields } },
        { upsert: true, returnOriginal: false }
      );

      // // Update session object with additional fields
      // session.user.username = updatedUser.value.username;
      // session.user.userId = updatedUser.value._id.toString();
      // session.user.accountType = updatedUser.value.accountType;
      // session.user.bio = updatedUser.value.bio;

      // console.log("updatedUser:", updatedUser);
    } catch (error) {
      console.error("Error updating user details in MongoDB:", error);
    }
    return Promise.resolve(session);
  },
};

export default async function auth(req, res) {
  return NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // Add other providers if needed
    ],

    adapter: MongoDBAdapter(clientPromise),

    pages: {
      // Override default NextAuth pages as needed
    },

    callbacks,
    // Enable debug messages in development
    debug: process.env.NODE_ENV === "development",
  });
}
