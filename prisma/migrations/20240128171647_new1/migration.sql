/*
  Warnings:

  - The `del_flg` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "del_flg",
ADD COLUMN     "del_flg" BOOLEAN NOT NULL DEFAULT false;
