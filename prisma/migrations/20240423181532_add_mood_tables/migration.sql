-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "mood_level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moodId" TEXT NOT NULL,
    "journal_entry" TEXT,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Influence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Influence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodEntryInfluence" (
    "id" TEXT NOT NULL,
    "moodEntryId" TEXT NOT NULL,
    "influenceId" TEXT NOT NULL,

    CONSTRAINT "MoodEntryInfluence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feeling" (
    "id" TEXT NOT NULL,
    "moodId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Feeling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodEntryFeeling" (
    "id" TEXT NOT NULL,
    "moodEntryId" TEXT NOT NULL,
    "feelingId" TEXT NOT NULL,

    CONSTRAINT "MoodEntryFeeling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalFactor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AdditionalFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyFactorLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "factorId" TEXT NOT NULL,

    CONSTRAINT "DailyFactorLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mood_mood_level_key" ON "Mood"("mood_level");

-- CreateIndex
CREATE UNIQUE INDEX "MoodEntryInfluence_moodEntryId_influenceId_key" ON "MoodEntryInfluence"("moodEntryId", "influenceId");

-- CreateIndex
CREATE UNIQUE INDEX "MoodEntryFeeling_moodEntryId_feelingId_key" ON "MoodEntryFeeling"("moodEntryId", "feelingId");

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntryInfluence" ADD CONSTRAINT "MoodEntryInfluence_moodEntryId_fkey" FOREIGN KEY ("moodEntryId") REFERENCES "MoodEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntryInfluence" ADD CONSTRAINT "MoodEntryInfluence_influenceId_fkey" FOREIGN KEY ("influenceId") REFERENCES "Influence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeling" ADD CONSTRAINT "Feeling_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntryFeeling" ADD CONSTRAINT "MoodEntryFeeling_moodEntryId_fkey" FOREIGN KEY ("moodEntryId") REFERENCES "MoodEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntryFeeling" ADD CONSTRAINT "MoodEntryFeeling_feelingId_fkey" FOREIGN KEY ("feelingId") REFERENCES "Feeling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalFactor" ADD CONSTRAINT "AdditionalFactor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyFactorLog" ADD CONSTRAINT "DailyFactorLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyFactorLog" ADD CONSTRAINT "DailyFactorLog_factorId_fkey" FOREIGN KEY ("factorId") REFERENCES "AdditionalFactor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
