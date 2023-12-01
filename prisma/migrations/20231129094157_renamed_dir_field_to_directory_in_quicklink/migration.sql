/*
  Warnings:

  - You are about to drop the column `dirId` on the `QuickLink` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuickLink" DROP CONSTRAINT "QuickLink_dirId_fkey";

-- AlterTable
ALTER TABLE "QuickLink" DROP COLUMN "dirId",
ADD COLUMN     "directoryId" TEXT;

-- AddForeignKey
ALTER TABLE "QuickLink" ADD CONSTRAINT "QuickLink_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
