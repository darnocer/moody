/*
  Warnings:

  - The primary key for the `Mood` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `moodId` on the `Feeling` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Mood` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `moodId` on the `MoodEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Feeling" DROP CONSTRAINT "Feeling_moodId_fkey";

-- DropForeignKey
ALTER TABLE "MoodEntry" DROP CONSTRAINT "MoodEntry_moodId_fkey";

-- AlterTable
ALTER TABLE "Feeling" DROP COLUMN "moodId",
ADD COLUMN     "moodId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Mood_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MoodEntry" DROP COLUMN "moodId",
ADD COLUMN     "moodId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeling" ADD CONSTRAINT "Feeling_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
