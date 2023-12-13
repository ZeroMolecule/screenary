/*
  Warnings:

  - You are about to drop the column `name` on the `EmbeddedPage` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `QuickLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmbeddedPage" DROP COLUMN "name",
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "QuickLink" DROP COLUMN "name",
ADD COLUMN     "title" TEXT;
