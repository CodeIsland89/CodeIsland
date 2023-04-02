/*
  Warnings:

  - You are about to drop the column `chapter_status_id` on the `MemberIsland` table. All the data in the column will be lost.
  - You are about to drop the column `lesson_status_id` on the `MemberIsland` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_id` on the `TestSet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[island_describe]` on the table `Island` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lesson_describe]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quiz_title]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lesson_id,quiz_order]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `island_describe` to the `Island` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_describe` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latest_solved_quiz_id` to the `MemberIsland` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_order` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_teach_content` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_title` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testset_profile_id` to the `TestSet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MemberIsland" DROP CONSTRAINT "MemberIsland_chapter_status_id_fkey";

-- DropForeignKey
ALTER TABLE "MemberIsland" DROP CONSTRAINT "MemberIsland_lesson_status_id_fkey";

-- DropForeignKey
ALTER TABLE "TestSet" DROP CONSTRAINT "TestSet_quiz_id_fkey";

-- AlterTable
ALTER TABLE "Island" ADD COLUMN     "island_describe" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "lesson_describe" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MemberIsland" DROP COLUMN "chapter_status_id",
DROP COLUMN "lesson_status_id",
ADD COLUMN     "latest_solved_quiz_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "quiz_order" INTEGER NOT NULL,
ADD COLUMN     "quiz_teach_content" TEXT NOT NULL,
ADD COLUMN     "quiz_title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestSet" DROP COLUMN "quiz_id",
ADD COLUMN     "testset_profile_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TestSetProfile" (
    "quiz_id" INTEGER NOT NULL,
    "standard_answer_code" TEXT NOT NULL,
    "function_name" TEXT NOT NULL,
    "exhibit_code" TEXT NOT NULL,

    CONSTRAINT "TestSetProfile_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "MemberTestProfilePerformance" (
    "record_id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "execution_code" TEXT NOT NULL,
    "memory_cost" INTEGER NOT NULL,
    "execution_time" INTEGER NOT NULL,
    "is_successful" BOOLEAN NOT NULL,

    CONSTRAINT "MemberTestProfilePerformance_pkey" PRIMARY KEY ("record_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestSetProfile_standard_answer_code_key" ON "TestSetProfile"("standard_answer_code");

-- CreateIndex
CREATE UNIQUE INDEX "TestSetProfile_function_name_key" ON "TestSetProfile"("function_name");

-- CreateIndex
CREATE UNIQUE INDEX "TestSetProfile_exhibit_code_key" ON "TestSetProfile"("exhibit_code");

-- CreateIndex
CREATE UNIQUE INDEX "Island_island_describe_key" ON "Island"("island_describe");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lesson_describe_key" ON "Lesson"("lesson_describe");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_quiz_title_key" ON "Quiz"("quiz_title");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_lesson_id_quiz_order_key" ON "Quiz"("lesson_id", "quiz_order");

-- AddForeignKey
ALTER TABLE "MemberIsland" ADD CONSTRAINT "MemberIsland_latest_solved_quiz_id_fkey" FOREIGN KEY ("latest_solved_quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSetProfile" ADD CONSTRAINT "TestSetProfile_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberTestProfilePerformance" ADD CONSTRAINT "MemberTestProfilePerformance_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberTestProfilePerformance" ADD CONSTRAINT "MemberTestProfilePerformance_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "TestSetProfile"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSet" ADD CONSTRAINT "TestSet_testset_profile_id_fkey" FOREIGN KEY ("testset_profile_id") REFERENCES "TestSetProfile"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;
