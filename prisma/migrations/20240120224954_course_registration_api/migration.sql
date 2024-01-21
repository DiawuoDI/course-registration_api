-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "confirmPassword" TEXT,
    "del_flg" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_courseTostudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "course_id_key" ON "course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_courseTostudent_AB_unique" ON "_courseTostudent"("A", "B");

-- CreateIndex
CREATE INDEX "_courseTostudent_B_index" ON "_courseTostudent"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_courseTostudent" ADD CONSTRAINT "_courseTostudent_A_fkey" FOREIGN KEY ("A") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_courseTostudent" ADD CONSTRAINT "_courseTostudent_B_fkey" FOREIGN KEY ("B") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
