/*
  Warnings:

  - You are about to drop the `QuickLinkDir` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuickLink" DROP CONSTRAINT "QuickLink_dirId_fkey";

-- DropForeignKey
ALTER TABLE "QuickLinkDir" DROP CONSTRAINT "QuickLinkDir_parentId_fkey";

-- DropForeignKey
ALTER TABLE "QuickLinkDir" DROP CONSTRAINT "QuickLinkDir_projectId_fkey";

-- DropForeignKey
ALTER TABLE "QuickLinkDir" DROP CONSTRAINT "QuickLinkDir_userId_fkey";

-- DropTable
DROP TABLE "QuickLinkDir";

-- CreateTable
CREATE TABLE "Directory" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "name" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Directory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickLink" ADD CONSTRAINT "QuickLink_dirId_fkey" FOREIGN KEY ("dirId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
