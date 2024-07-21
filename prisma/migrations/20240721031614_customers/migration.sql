-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NULL,
    `mobile_number` CHAR(10) NOT NULL,
    `city` VARCHAR(255) NULL,
    `date_created` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `time_stamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` INTEGER NULL,
    `is_active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `mobile_number`(`mobile_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
