/*
  Warnings:

  - Added the required column `role` to the `ProjectMembers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PROJECT_MANAGER', 'TEAM_LEAD', 'DEVELOPER', 'TESTER');

-- AlterTable
ALTER TABLE "ProjectMembers" ADD COLUMN     "role" "Role" NOT NULL;
