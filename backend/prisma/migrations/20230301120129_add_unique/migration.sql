/*
  Warnings:

  - A unique constraint covering the columns `[source_url]` on the table `Island` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lesson_name]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lesson_name,lesson_order]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[input,output]` on the table `TestSet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Island_source_url_key` ON `Island`(`source_url`);

-- CreateIndex
CREATE UNIQUE INDEX `Lesson_lesson_name_key` ON `Lesson`(`lesson_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Lesson_lesson_name_lesson_order_key` ON `Lesson`(`lesson_name`, `lesson_order`);

-- CreateIndex
CREATE UNIQUE INDEX `TestSet_input_output_key` ON `TestSet`(`input`, `output`);
