/*
  Warnings:

  - You are about to alter the column `first_name` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `last_name` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[full_name,mobile_number]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `full_name` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date_created` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time_stamp` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_active` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `customers` MODIFY `first_name` VARCHAR(191) NOT NULL,
    MODIFY `last_name` VARCHAR(191) NOT NULL,
    MODIFY `full_name` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `mobile_number` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `created_by` VARCHAR(191) NOT NULL,
    MODIFY `time_stamp` DATETIME(3) NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `skus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `time_stamp` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `skus_name_key`(`name`),
    UNIQUE INDEX `skus_code_key`(`code`),
    UNIQUE INDEX `skus_name_code_key`(`name`, `code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `customer_full_name_idx` ON `customers`(`full_name`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_full_name_mobile_number_key` ON `customers`(`full_name`, `mobile_number`);

-- RenameIndex
ALTER TABLE `customers` RENAME INDEX `mobile_number` TO `customers_mobile_number_key`;
