-- CreateTable
CREATE TABLE "Jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "companySite" TEXT NOT NULL,
    "companyLogo" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "jobContent" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
