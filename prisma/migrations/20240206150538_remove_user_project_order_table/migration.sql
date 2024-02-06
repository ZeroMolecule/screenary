/*
  Warnings:

  - You are about to drop the `UserProjectOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProjectOrder" DROP CONSTRAINT "UserProjectOrder_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserProjectOrder" DROP CONSTRAINT "UserProjectOrder_userId_fkey";

-- DropTable
DROP TABLE "UserProjectOrder";
