-- CreateEnum
CREATE TYPE "QuizType" AS ENUM ('TESTSET', 'OPTION');

-- CreateTable
CREATE TABLE "Member" (
    "member_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_vip" BOOLEAN NOT NULL DEFAULT false,
    "continuous_day" INTEGER NOT NULL DEFAULT 0,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "gem" INTEGER NOT NULL DEFAULT 0,
    "nickname" TEXT NOT NULL,
    "source_url" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "Island" (
    "island_id" SERIAL NOT NULL,
    "island_name" TEXT NOT NULL,
    "source_url" TEXT,

    CONSTRAINT "Island_pkey" PRIMARY KEY ("island_id")
);

-- CreateTable
CREATE TABLE "MemberIsland" (
    "member_id" INTEGER NOT NULL,
    "island_id" INTEGER NOT NULL,
    "island_status" TEXT NOT NULL DEFAULT '0-0',

    CONSTRAINT "MemberIsland_pkey" PRIMARY KEY ("member_id","island_id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "chapter_id" SERIAL NOT NULL,
    "chapter_name" TEXT NOT NULL,
    "chapter_detail" TEXT NOT NULL,
    "chapter_order" INTEGER NOT NULL,
    "island_id" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("chapter_id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "lesson_id" SERIAL NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "lesson_order" INTEGER NOT NULL,
    "chapter_id" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("lesson_id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "quiz_id" SERIAL NOT NULL,
    "quiz_describe" TEXT NOT NULL,
    "quiz_type" "QuizType" NOT NULL,
    "lesson_id" INTEGER NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "TestSet" (
    "testset_id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "quiz_id" INTEGER NOT NULL,

    CONSTRAINT "TestSet_pkey" PRIMARY KEY ("testset_id")
);

-- CreateTable
CREATE TABLE "Option" (
    "option_id" SERIAL NOT NULL,
    "option_describe" TEXT NOT NULL,
    "is_answer" BOOLEAN NOT NULL,
    "quiz_id" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("option_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Island_island_name_key" ON "Island"("island_name");

-- CreateIndex
CREATE UNIQUE INDEX "Island_source_url_key" ON "Island"("source_url");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_chapter_name_key" ON "Chapter"("chapter_name");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_chapter_detail_key" ON "Chapter"("chapter_detail");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_chapter_name_chapter_order_key" ON "Chapter"("chapter_name", "chapter_order");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lesson_name_key" ON "Lesson"("lesson_name");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lesson_name_lesson_order_key" ON "Lesson"("lesson_name", "lesson_order");

-- CreateIndex
CREATE UNIQUE INDEX "TestSet_input_output_key" ON "TestSet"("input", "output");

-- AddForeignKey
ALTER TABLE "MemberIsland" ADD CONSTRAINT "MemberIsland_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberIsland" ADD CONSTRAINT "MemberIsland_island_id_fkey" FOREIGN KEY ("island_id") REFERENCES "Island"("island_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_island_id_fkey" FOREIGN KEY ("island_id") REFERENCES "Island"("island_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("lesson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSet" ADD CONSTRAINT "TestSet_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;
