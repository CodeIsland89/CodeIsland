/*
  Warnings:

  - The values [OPTION] on the enum `QuizType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuizType_new" AS ENUM ('TESTSET', 'CLOZE');
ALTER TABLE "Quiz" ALTER COLUMN "quiz_type" TYPE "QuizType_new" USING ("quiz_type"::text::"QuizType_new");
ALTER TYPE "QuizType" RENAME TO "QuizType_old";
ALTER TYPE "QuizType_new" RENAME TO "QuizType";
DROP TYPE "QuizType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_quiz_id_fkey";

-- DropTable
DROP TABLE "Option";

-- CreateTable
CREATE TABLE "Cloze" (
    "cloze_id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "cloze_content" TEXT NOT NULL,
    "cloze_order" INTEGER NOT NULL,

    CONSTRAINT "Cloze_pkey" PRIMARY KEY ("cloze_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cloze_quiz_id_cloze_order_key" ON "Cloze"("quiz_id", "cloze_order");

-- AddForeignKey
ALTER TABLE "Cloze" ADD CONSTRAINT "Cloze_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;
