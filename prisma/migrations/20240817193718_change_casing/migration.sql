/*
  Warnings:

  - You are about to drop the column `media_id` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `media_id`,
    ADD COLUMN `mediaId` BIGINT NOT NULL;
