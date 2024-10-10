/*
  Warnings:

  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN;

-- CreateTable
CREATE TABLE "Consultant" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "specialite" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "note" DOUBLE PRECISION,
    "description" TEXT,
    "annee_exercice" INTEGER NOT NULL,

    CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id")
);
