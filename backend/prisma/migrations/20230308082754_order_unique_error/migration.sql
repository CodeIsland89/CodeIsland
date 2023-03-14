/*
  Warnings:

  - A unique constraint covering the columns `[chapter_order]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapter_id,chapter_order]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lesson_id,lesson_order]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Chapter_chapter_detail_key";

-- DropIndex
DROP INDEX "Chapter_chapter_name_chapter_order_key";

-- DropIndex
DROP INDEX "Lesson_lesson_name_lesson_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_chapter_order_key" ON "Chapter"("chapter_order");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_chapter_id_chapter_order_key" ON "Chapter"("chapter_id", "chapter_order");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lesson_id_lesson_order_key" ON "Lesson"("lesson_id", "lesson_order");
