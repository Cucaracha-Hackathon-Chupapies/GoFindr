-- AlterTable
ALTER TABLE `Account` ADD COLUMN `icon` VARCHAR(191) NOT NULL DEFAULT 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?resize=300%2C300&ssl=1';

-- AlterTable
ALTER TABLE `ItemRating` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Store` ADD COLUMN `icon` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `StoreRating` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
