/*
  Warnings:

  - Made the column `img_source_url` on table `Island` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Island" ALTER COLUMN "img_source_url" SET NOT NULL;
