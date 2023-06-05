/*
  Warnings:

  - You are about to drop the `_SavedStores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_SavedStores` DROP FOREIGN KEY `_SavedStores_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SavedStores` DROP FOREIGN KEY `_SavedStores_B_fkey`;

-- DropTable
DROP TABLE `_SavedStores`;

-- CreateTable
CREATE TABLE `_AccountToStore` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `_AccountToStore_AB_unique`(`A`, `B`),
    INDEX `_AccountToStore_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AccountToStore` ADD CONSTRAINT `_AccountToStore_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccountToStore` ADD CONSTRAINT `_AccountToStore_B_fkey` FOREIGN KEY (`B`) REFERENCES `Store`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
