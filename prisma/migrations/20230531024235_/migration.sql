/*
  Warnings:

  - Made the column `image` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `rating` FLOAT NOT NULL DEFAULT 0,
    MODIFY `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `StoreInfo` ADD COLUMN `icon` VARCHAR(191) NULL;
