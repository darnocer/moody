/*
  Warnings:

  - The primary key for the `Influence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Influence` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `influenceId` on the `MoodEntryInfluence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "MoodEntryInfluence" DROP CONSTRAINT "MoodEntryInfluence_influenceId_fkey";

-- AlterTable
ALTER TABLE "Influence" DROP CONSTRAINT "Influence_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Influence_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MoodEntryInfluence" DROP COLUMN "influenceId",
ADD COLUMN     "influenceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MoodEntryInfluence_moodEntryId_influenceId_key" ON "MoodEntryInfluence"("moodEntryId", "influenceId");

-- AddForeignKey
ALTER TABLE "MoodEntryInfluence" ADD CONSTRAINT "MoodEntryInfluence_influenceId_fkey" FOREIGN KEY ("influenceId") REFERENCES "Influence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
