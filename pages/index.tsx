import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import MoodSelection, { MoodProps } from "../components/MoodSelection";

import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  const moods = await prisma.mood.findMany({
    orderBy: {
      mood_level: "asc",
    },
  });

  return {
    props: {
      feed,
      moods,
    },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
  moods: MoodProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1 className="text-h1 text-primary-500">Select your mood</h1>
        <main>
          <MoodSelection moods={props.moods} />
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
