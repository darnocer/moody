// /prisma/seeds.mts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const moods = [
    { id: 1, mood_level: 1, name: "Awful" },
    { id: 2, mood_level: 2, name: "Bad" },
    { id: 3, mood_level: 3, name: "Okay" },
    { id: 4, mood_level: 4, name: "Good" },
    { id: 5, mood_level: 5, name: "Great" },
  ];

  for (const mood of moods) {
    await prisma.mood.create({ data: mood });
  }
  console.log("Moods seeded successfully!");

  const influences = [
    { id: 1, name: "Family", icon: "people-roof" },
    { id: 2, name: "Relationship", icon: "heart" },
    { id: 3, name: "Friends", icon: "uder-group" },
    { id: 4, name: "Spirituality", icon: "hands-praying" },
    { id: 5, name: "Health", icon: "house-medical" },
    { id: 6, name: "Work", icon: "briefcase" },
    { id: 7, name: "Studies", icon: "book-open" },
    { id: 8, name: "Finances", icon: "dollar-sign" },
  ];

  for (const influence of influences) {
    await prisma.influence.create({ data: influence });
  }
  console.log("Influences seeded successfully!");

  const feelings = [
    { moodId: 1, name: "Sad" },
    { moodId: 1, name: "Disappointed" },
    { moodId: 1, name: "Hurt" },
    { moodId: 2, name: "Tired" },
    { moodId: 2, name: "Lonely" },
    { moodId: 2, name: "Anxious" },
    { moodId: 3, name: "Calm" },
    { moodId: 3, name: "Stressed" },
    { moodId: 3, name: "Bored" },
    { moodId: 4, name: "Happy" },
    { moodId: 4, name: "Grateful" },
    { moodId: 4, name: "Relaxed" },
    { moodId: 5, name: "Excited" },
    { moodId: 5, name: "Confident" },
    { moodId: 5, name: "Hopeful" },
  ];

  for (const feeling of feelings) {
    await prisma.feeling.create({ data: feeling });
  }
  console.log("Feelings seeded successfully!");
}

main()
  .then(() => {
    console.log("Database seeding completed successfully!");
  })
  .catch((e) => {
    console.error("Database seeding failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
