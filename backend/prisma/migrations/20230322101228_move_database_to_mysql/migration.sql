-- CreateTable
CREATE TABLE `Member` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Member_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `member_id` INTEGER NOT NULL,
    `continuous_day` INTEGER NOT NULL DEFAULT 0,
    `exp` INTEGER NOT NULL DEFAULT 0,
    `gem` INTEGER NOT NULL DEFAULT 0,
    `nickname` VARCHAR(191) NOT NULL,
    `img_source_url` VARCHAR(191) NULL,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_role_name_key`(`role_name`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Action` (
    `action_id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Action_action_name_key`(`action_name`),
    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Island` (
    `island_id` INTEGER NOT NULL AUTO_INCREMENT,
    `island_name` VARCHAR(191) NOT NULL,
    `island_describe` VARCHAR(191) NOT NULL,
    `img_source_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Island_island_name_key`(`island_name`),
    UNIQUE INDEX `Island_island_describe_key`(`island_describe`),
    UNIQUE INDEX `Island_img_source_url_key`(`img_source_url`),
    PRIMARY KEY (`island_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberIsland` (
    `member_id` INTEGER NOT NULL,
    `island_id` INTEGER NOT NULL,
    `latest_solved_quiz_id` INTEGER NOT NULL,

    PRIMARY KEY (`member_id`, `island_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `chapter_id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapter_name` VARCHAR(191) NOT NULL,
    `chapter_detail` VARCHAR(191) NOT NULL,
    `chapter_order` INTEGER NOT NULL,
    `island_id` INTEGER NOT NULL,

    UNIQUE INDEX `Chapter_chapter_name_key`(`chapter_name`),
    UNIQUE INDEX `Chapter_chapter_order_key`(`chapter_order`),
    UNIQUE INDEX `Chapter_island_id_chapter_order_key`(`island_id`, `chapter_order`),
    PRIMARY KEY (`chapter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lesson` (
    `lesson_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lesson_name` VARCHAR(191) NOT NULL,
    `lesson_describe` VARCHAR(191) NOT NULL,
    `lesson_order` INTEGER NOT NULL,
    `chapter_id` INTEGER NOT NULL,

    UNIQUE INDEX `Lesson_lesson_name_key`(`lesson_name`),
    UNIQUE INDEX `Lesson_lesson_describe_key`(`lesson_describe`),
    UNIQUE INDEX `Lesson_chapter_id_lesson_order_key`(`chapter_id`, `lesson_order`),
    PRIMARY KEY (`lesson_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `quiz_id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_title` VARCHAR(191) NOT NULL,
    `quiz_describe` VARCHAR(191) NOT NULL,
    `quiz_type` ENUM('TESTSET', 'CLOZE') NOT NULL,
    `quiz_teach_content` VARCHAR(191) NOT NULL,
    `quiz_order` INTEGER NOT NULL,
    `lesson_id` INTEGER NOT NULL,

    UNIQUE INDEX `Quiz_quiz_title_key`(`quiz_title`),
    UNIQUE INDEX `Quiz_lesson_id_quiz_order_key`(`lesson_id`, `quiz_order`),
    PRIMARY KEY (`quiz_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestSetProfile` (
    `quiz_id` INTEGER NOT NULL,
    `standard_answer_code` VARCHAR(191) NOT NULL,
    `function_name` VARCHAR(191) NOT NULL,
    `exhibit_code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TestSetProfile_standard_answer_code_key`(`standard_answer_code`),
    UNIQUE INDEX `TestSetProfile_function_name_key`(`function_name`),
    UNIQUE INDEX `TestSetProfile_exhibit_code_key`(`exhibit_code`),
    PRIMARY KEY (`quiz_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberTestProfilePerformance` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `quiz_id` INTEGER NOT NULL,
    `execution_code` VARCHAR(191) NOT NULL,
    `memory_cost` INTEGER NOT NULL,
    `execution_time` INTEGER NOT NULL,
    `is_successful` BOOLEAN NOT NULL,

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestSet` (
    `testset_id` INTEGER NOT NULL AUTO_INCREMENT,
    `testset_profile_id` INTEGER NOT NULL,
    `input` VARCHAR(191) NOT NULL,
    `output` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TestSet_input_output_key`(`input`, `output`),
    PRIMARY KEY (`testset_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cloze` (
    `cloze_id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` INTEGER NOT NULL,
    `cloze_content` VARCHAR(191) NOT NULL,
    `cloze_order` INTEGER NOT NULL,

    UNIQUE INDEX `Cloze_quiz_id_cloze_order_key`(`quiz_id`, `cloze_order`),
    PRIMARY KEY (`cloze_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MemberToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MemberToRole_AB_unique`(`A`, `B`),
    INDEX `_MemberToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ActionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ActionToRole_AB_unique`(`A`, `B`),
    INDEX `_ActionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberIsland` ADD CONSTRAINT `MemberIsland_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberIsland` ADD CONSTRAINT `MemberIsland_island_id_fkey` FOREIGN KEY (`island_id`) REFERENCES `Island`(`island_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberIsland` ADD CONSTRAINT `MemberIsland_latest_solved_quiz_id_fkey` FOREIGN KEY (`latest_solved_quiz_id`) REFERENCES `Quiz`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_island_id_fkey` FOREIGN KEY (`island_id`) REFERENCES `Island`(`island_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`chapter_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_lesson_id_fkey` FOREIGN KEY (`lesson_id`) REFERENCES `Lesson`(`lesson_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestSetProfile` ADD CONSTRAINT `TestSetProfile_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `Quiz`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberTestProfilePerformance` ADD CONSTRAINT `MemberTestProfilePerformance_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberTestProfilePerformance` ADD CONSTRAINT `MemberTestProfilePerformance_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `TestSetProfile`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestSet` ADD CONSTRAINT `TestSet_testset_profile_id_fkey` FOREIGN KEY (`testset_profile_id`) REFERENCES `TestSetProfile`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cloze` ADD CONSTRAINT `Cloze_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `Quiz`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MemberToRole` ADD CONSTRAINT `_MemberToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Member`(`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MemberToRole` ADD CONSTRAINT `_MemberToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActionToRole` ADD CONSTRAINT `_ActionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Action`(`action_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActionToRole` ADD CONSTRAINT `_ActionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
