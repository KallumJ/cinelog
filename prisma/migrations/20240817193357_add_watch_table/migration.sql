/*
  Warnings:

  - You are about to drop the column `tmdb_id` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `media_id` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `tmdb_id`,
    ADD COLUMN `media_id` BIGINT NOT NULL;

-- CreateTable
CREATE TABLE `Watch` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `media_id` BIGINT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Watch` ADD CONSTRAINT `Watch_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
