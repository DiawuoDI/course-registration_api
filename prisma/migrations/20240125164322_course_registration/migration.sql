/*
  Warnings:

  - You are about to drop the column `courseName` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `studentName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_CourseToStudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToStudent" DROP CONSTRAINT "_CourseToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToStudent" DROP CONSTRAINT "_CourseToStudent_B_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "programesId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studentName",
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "programesId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "studentName",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CourseToStudent";

-- CreateTable
CREATE TABLE "Programes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Programes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Programes_id_key" ON "Programes"("id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_programesId_fkey" FOREIGN KEY ("programesId") REFERENCES "Programes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_programesId_fkey" FOREIGN KEY ("programesId") REFERENCES "Programes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
