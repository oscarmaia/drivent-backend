/*
  Warnings:

  - You are about to drop the column `endsAt` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `finishesAt` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "endsAt",
ADD COLUMN     "finishesAt" TEXT NOT NULL,
ALTER COLUMN "startsAt" SET DATA TYPE TEXT;
