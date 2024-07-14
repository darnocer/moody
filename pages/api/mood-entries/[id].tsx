import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entryId = req.query.id as string;

  if (req.method === "DELETE") {
    try {
      const deletedEntry = await prisma.moodEntry.delete({
        where: { id: entryId },
      });
      res.status(200).json(deletedEntry);
    } catch (error) {
      res.status(500).json({ error: "Error deleting mood entry" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
