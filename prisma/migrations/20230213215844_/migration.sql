/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `blacklist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blacklist" DROP COLUMN "deletedAt",
ADD COLUMN     "removedAt" DATE;
