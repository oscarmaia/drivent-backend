/*
  Warnings:

  - You are about to drop the column `finishesAt` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `EnrolmentActivity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endsAt` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startsAt` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "EnrolmentActivity" DROP CONSTRAINT "EnrolmentActivity_activityId_fkey";

-- DropForeignKey
ALTER TABLE "EnrolmentActivity" DROP CONSTRAINT "EnrolmentActivity_enrollmentId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "finishesAt",
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "startsAt",
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "EnrolmentActivity";

-- CreateTable
CREATE TABLE "EnrollmentActivity" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrollmentActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnrollmentActivity" ADD CONSTRAINT "EnrollmentActivity_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentActivity" ADD CONSTRAINT "EnrollmentActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
