/*
  Warnings:

  - A unique constraint covering the columns `[island_id,chapter_order]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapter_id,lesson_order]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Chapter_chapter_id_chapter_order_key";

-- DropIndex
DROP INDEX "Lesson_lesson_id_lesson_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_island_id_chapter_order_key" ON "Chapter"("island_id", "chapter_order");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_chapter_id_lesson_order_key" ON "Lesson"("chapter_id", "lesson_order");
