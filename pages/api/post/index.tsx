import { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  console.log("Retrieved session:", session);

  if (!session || !session.user || !session.user.email) {
    console.log("Session or user details are missing:", session);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, content } = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: session.user.email } },
      },
    });
    return res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in post creation:", error.message, error.stack);
      return res
        .status(500)
        .json({ error: "Failed to create post.", details: error.message });
    } else {
      console.error("Unknown error in post creation:", error);
      return res.status(500).json({ error: "Failed to create post." });
    }
  }
}
