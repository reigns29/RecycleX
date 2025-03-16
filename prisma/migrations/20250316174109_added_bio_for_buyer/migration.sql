/*
  Warnings:

  - Added the required column `bio` to the `Buyer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "bio" TEXT NOT NULL;
