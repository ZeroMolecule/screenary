/*
  Warnings:

  - A unique constraint covering the columns `[userId,order]` on the table `UserProjectOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserProjectOrder_userId_projectId_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserProjectOrder_userId_order_key" ON "UserProjectOrder"("userId", "order");
