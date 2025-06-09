-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "QuizAttempt" ALTER COLUMN "attemptDetails" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;
