// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

const callbacks = {
  session: async (session, user) => {
    try {
      const client = await clientPromise;
      if (typeof client.db !== "function") {
        console.error("client.db is not a function");
        return Promise.resolve(session);
      }
      console.log("CHECK!!!!!:" + client);

      if (user) console.log("OUR USER:" + user);
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
