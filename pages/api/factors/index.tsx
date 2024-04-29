// pages/api/factors.tsx

import { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dailyFactorLogs = await prisma.dailyFactorLog.findMany({
        where: {
          userId: user.id,
          date: {
            gte: today,
          },
        },
        select: {
          factorId: true,
        },
      });

      res
        .status(200)
        .json({ selectedFactors: dailyFactorLogs.map((log) => log.factorId) });
    } catch (error) {
      console.error("Error retrieving daily factor logs:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const { selectedFactors } = req.body;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await prisma.dailyFactorLog.deleteMany({
        where: {
          userId: user.id,
          date: {
            gte: today,
          },
        },
      });

      await prisma.dailyFactorLog.createMany({
        data: selectedFactors.map((factorId: string) => ({
          userId: user.id,
          factorId,
        })),
      });

      res.status(200).json({ message: "Factors updated successfully" });
    } catch (error) {
      console.error("Error updating daily factor logs:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
