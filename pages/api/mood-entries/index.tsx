// pages/api/mood-entries.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./.././auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    console.log("Session:", session);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { moodId } = req.body;
    console.log("Mood ID:", moodId);

    try {
      const moodEntry = await prisma.moodEntry.create({
        data: {
          user: {
            connect: { email: session.user.email },
          },
          mood: {
            connect: { id: moodId },
          },
        },
      });

      res.status(201).json(moodEntry);
    } catch (error) {
      console.error("Error creating mood entry:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
