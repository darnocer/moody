import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;
  if (typeof postId === "string") {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });
    res.json(post);
  }
}
