/*
  Warnings:

  - A unique constraint covering the columns `[chapter_name]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapter_detail]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapter_name,chapter_order]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Chapter_chapter_name_key` ON `Chapter`(`chapter_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Chapter_chapter_detail_key` ON `Chapter`(`chapter_detail`);

-- CreateIndex
CREATE UNIQUE INDEX `Chapter_chapter_name_chapter_order_key` ON `Chapter`(`chapter_name`, `chapter_order`);
