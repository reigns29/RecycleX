/*
  Warnings:

  - Added the required column `userId` to the `Buyer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "userId" TEXT NOT NULL;
