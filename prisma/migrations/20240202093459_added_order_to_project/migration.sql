/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_order_key" ON "Project"("order");
