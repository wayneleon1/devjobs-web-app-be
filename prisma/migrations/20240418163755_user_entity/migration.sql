-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companySite" TEXT NOT NULL,
    "companyLogo" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "jobContent" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);
