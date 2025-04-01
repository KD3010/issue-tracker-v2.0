/*
  Warnings:

  - You are about to drop the column `assigneeUserId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeUserId_fkey";

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "fileName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assigneeUserId",
ADD COLUMN     "assignedUserId" INTEGER,
ALTER COLUMN "tags" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicture",
ADD COLUMN     "profilePictureUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
