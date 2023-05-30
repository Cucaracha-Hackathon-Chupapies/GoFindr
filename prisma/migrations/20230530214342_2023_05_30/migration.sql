-- CreateTable
CREATE TABLE `Theme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `backgroundImage` VARCHAR(191) NOT NULL,
    `font` VARCHAR(255) NOT NULL,
    `componentColor` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `displayName` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `themeId` INTEGER NULL,

    UNIQUE INDEX `Store_name_key`(`name`),
    UNIQUE INDEX `Store_displayName_key`(`displayName`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreInfo` (
    `name` VARCHAR(50) NOT NULL,
    `displayName` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `rating` FLOAT NOT NULL DEFAULT 0,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `themeId` INTEGER NULL,
    `ownerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StoreInfo_name_key`(`name`),
    UNIQUE INDEX `StoreInfo_displayName_key`(`displayName`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(255) NOT NULL,
    `rating` FLOAT NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `popular` BOOLEAN NOT NULL DEFAULT false,
    `storeName` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Account_id_key`(`id`),
    UNIQUE INDEX `Account_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SavedStores` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `_SavedStores_AB_unique`(`A`, `B`),
    INDEX `_SavedStores_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreInfo` ADD CONSTRAINT `StoreInfo_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreInfo` ADD CONSTRAINT `StoreInfo_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_storeName_fkey` FOREIGN KEY (`storeName`) REFERENCES `StoreInfo`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SavedStores` ADD CONSTRAINT `_SavedStores_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SavedStores` ADD CONSTRAINT `_SavedStores_B_fkey` FOREIGN KEY (`B`) REFERENCES `StoreInfo`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
