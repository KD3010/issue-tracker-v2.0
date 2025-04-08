/*
  Warnings:

  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_UserToWorkspace` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `ProjectMembers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('PROJECT_MANAGER', 'TEAM_LEAD', 'DEVELOPER', 'TESTER');

-- CreateEnum
CREATE TYPE "WokspaceRole" AS ENUM ('OWNER', 'CONTRIBUTOR');

-- DropForeignKey
ALTER TABLE "_UserToWorkspace" DROP CONSTRAINT "_UserToWorkspace_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkspace" DROP CONSTRAINT "_UserToWorkspace_B_fkey";

-- AlterTable
ALTER TABLE "ProjectMembers" DROP COLUMN "role",
ADD COLUMN     "role" "ProjectRole" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamId";

-- DropTable
DROP TABLE "_UserToWorkspace";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "WorkspaceMembers" (
    "userId" TEXT NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "role" "WokspaceRole" NOT NULL,

    CONSTRAINT "WorkspaceMembers_pkey" PRIMARY KEY ("userId","workspaceId")
);

-- AddForeignKey
ALTER TABLE "WorkspaceMembers" ADD CONSTRAINT "WorkspaceMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMembers" ADD CONSTRAINT "WorkspaceMembers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
