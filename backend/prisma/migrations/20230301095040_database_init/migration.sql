/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Member` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `is_vip` BOOLEAN NOT NULL DEFAULT false,
    `continuous_day` INTEGER NOT NULL DEFAULT 0,
    `exp` INTEGER NOT NULL DEFAULT 0,
    `gem` INTEGER NOT NULL DEFAULT 0,
    `nickname` VARCHAR(191) NOT NULL,
    `source_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Member_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Island` (
    `island_id` INTEGER NOT NULL AUTO_INCREMENT,
    `island_name` VARCHAR(191) NOT NULL,
    `source_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Island_island_name_key`(`island_name`),
    PRIMARY KEY (`island_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberIsland` (
    `member_id` INTEGER NOT NULL,
    `island_id` INTEGER NOT NULL,
    `island_status` VARCHAR(191) NOT NULL DEFAULT '0-0',

    PRIMARY KEY (`member_id`, `island_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `chapter_id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapter_name` VARCHAR(191) NOT NULL,
    `chapter_detail` VARCHAR(191) NOT NULL,
    `chapter_order` INTEGER NOT NULL,
    `island_id` INTEGER NOT NULL,

    PRIMARY KEY (`chapter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lesson` (
    `lesson_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lesson_name` VARCHAR(191) NOT NULL,
    `lesson_order` INTEGER NOT NULL,
    `chapter_id` INTEGER NOT NULL,

    PRIMARY KEY (`lesson_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `quiz_id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_describe` VARCHAR(191) NOT NULL,
    `quiz_type` ENUM('TESTSET', 'OPTION') NOT NULL,
    `lesson_id` INTEGER NOT NULL,

    PRIMARY KEY (`quiz_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestSet` (
    `testset_id` INTEGER NOT NULL AUTO_INCREMENT,
    `input` VARCHAR(191) NOT NULL,
    `output` VARCHAR(191) NOT NULL,
    `quiz_id` INTEGER NOT NULL,

    PRIMARY KEY (`testset_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Option` (
    `option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_describe` VARCHAR(191) NOT NULL,
    `is_answer` BOOLEAN NOT NULL,
    `quiz_id` INTEGER NOT NULL,

    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MemberIsland` ADD CONSTRAINT `MemberIsland_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberIsland` ADD CONSTRAINT `MemberIsland_island_id_fkey` FOREIGN KEY (`island_id`) REFERENCES `Island`(`island_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_island_id_fkey` FOREIGN KEY (`island_id`) REFERENCES `Island`(`island_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`chapter_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_lesson_id_fkey` FOREIGN KEY (`lesson_id`) REFERENCES `Lesson`(`lesson_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestSet` ADD CONSTRAINT `TestSet_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `Quiz`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `Quiz`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
