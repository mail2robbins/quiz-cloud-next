/*
  Warnings:

  - You are about to drop the column `answeredAt` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `QuizAttempt` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attemptDetails` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.
  - Made the column `timeSpent` on table `QuizAttempt` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "QuizAttempt" DROP CONSTRAINT "QuizAttempt_quizId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "answeredAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "completedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "attemptDetails" JSONB NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "timeSpent" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
