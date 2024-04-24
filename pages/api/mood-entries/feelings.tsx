// pages/api/mood-entries/feelings.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { moodId } = req.query;

    if (typeof moodId !== "string") {
      res.status(400).json({ error: "Invalid moodId" });
      return;
    }

    try {
      const feelings = await prisma.feeling.findMany({
        where: {
          moodId: parseInt(moodId),
        },
      });

      res.status(200).json(feelings);
    } catch (error) {
      console.error("Error fetching feelings:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
