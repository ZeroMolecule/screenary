/*
  Warnings:

  - You are about to drop the column `order` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_order_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "order";

-- CreateTable
CREATE TABLE "UserProjectOrder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "order" SERIAL NOT NULL,

    CONSTRAINT "UserProjectOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProjectOrder_userId_projectId_order_key" ON "UserProjectOrder"("userId", "projectId", "order");

-- AddForeignKey
ALTER TABLE "UserProjectOrder" ADD CONSTRAINT "UserProjectOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProjectOrder" ADD CONSTRAINT "UserProjectOrder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
