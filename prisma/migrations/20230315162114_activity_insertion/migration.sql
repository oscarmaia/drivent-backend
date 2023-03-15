-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startsAt" TEXT NOT NULL,
    "finishesAt" TEXT NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrolmentActivity" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrolmentActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnrolmentActivity" ADD CONSTRAINT "EnrolmentActivity_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolmentActivity" ADD CONSTRAINT "EnrolmentActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
