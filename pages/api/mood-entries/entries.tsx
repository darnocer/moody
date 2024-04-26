import { getServerSession } from "next-auth/next";
import { authOptions } from "./../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      console.log("USER: ", user);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const moodEntries = await prisma.moodEntry.findMany({
        where: { userId: user.id },
        include: {
          mood: true,
          influences: { include: { influence: true } },
          feelings: { include: { feeling: true } },
        },
        orderBy: { timestamp: "desc" },
      });

      res.status(200).json(moodEntries);
    } catch (error) {
      console.error("Error retrieving mood entries:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
