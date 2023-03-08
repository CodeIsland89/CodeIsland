/*
  Warnings:

  - You are about to drop the column `source_url` on the `Island` table. All the data in the column will be lost.
  - You are about to drop the column `continuous_day` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `exp` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `gem` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `is_vip` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `source_url` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `island_status` on the `MemberIsland` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[img_source_url]` on the table `Island` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapter_status_id` to the `MemberIsland` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_status_id` to the `MemberIsland` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Island_source_url_key";

-- AlterTable
ALTER TABLE "Island" DROP COLUMN "source_url",
ADD COLUMN     "img_source_url" TEXT;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "continuous_day",
DROP COLUMN "exp",
DROP COLUMN "gem",
DROP COLUMN "is_admin",
DROP COLUMN "is_vip",
DROP COLUMN "nickname",
DROP COLUMN "source_url";

-- AlterTable
ALTER TABLE "MemberIsland" DROP COLUMN "island_status",
ADD COLUMN     "chapter_status_id" INTEGER NOT NULL,
ADD COLUMN     "lesson_status_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "member_id" INTEGER NOT NULL,
    "continuous_day" INTEGER NOT NULL DEFAULT 0,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "gem" INTEGER NOT NULL DEFAULT 0,
    "nickname" TEXT NOT NULL,
    "img_source_url" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Action" (
    "action_id" SERIAL NOT NULL,
    "action_name" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("action_id")
);

-- CreateTable
CREATE TABLE "_MemberToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ActionToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_action_name_key" ON "Action"("action_name");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToRole_AB_unique" ON "_MemberToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToRole_B_index" ON "_MemberToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToRole_AB_unique" ON "_ActionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToRole_B_index" ON "_ActionToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Island_img_source_url_key" ON "Island"("img_source_url");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberIsland" ADD CONSTRAINT "MemberIsland_chapter_status_id_fkey" FOREIGN KEY ("chapter_status_id") REFERENCES "Chapter"("chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberIsland" ADD CONSTRAINT "MemberIsland_lesson_status_id_fkey" FOREIGN KEY ("lesson_status_id") REFERENCES "Lesson"("lesson_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToRole" ADD CONSTRAINT "_MemberToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("member_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToRole" ADD CONSTRAINT "_MemberToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToRole" ADD CONSTRAINT "_ActionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("action_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToRole" ADD CONSTRAINT "_ActionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;
