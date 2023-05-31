-- CreateTable
CREATE TABLE `StoreRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StoreRating_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ItemRating_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StoreRating` ADD CONSTRAINT `StoreRating_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `StoreInfo`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
