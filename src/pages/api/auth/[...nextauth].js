// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectToDB from "../../../../lib/mongodb";

export default async function auth(req, res) {
  //   const db = await connectToDB();

  return NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // Add other providers if needed
    ],

    // adapter: MongoDBAdapter({
    //   db,
    // }),

    pages: {
      // Override default NextAuth pages as needed
    },

    callbacks: {
      // Customize NextAuth callbacks as needed
    },

    // Enable debug messages in development
    debug: process.env.NODE_ENV === "development",
  });
}
