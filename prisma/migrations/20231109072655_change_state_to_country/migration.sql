/*
  Warnings:

  - You are about to drop the column `state` on the `BillingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `ReceivingAddress` table. All the data in the column will be lost.
  - Added the required column `country` to the `BillingAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `ReceivingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillingAddress" DROP COLUMN "state",
ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReceivingAddress" DROP COLUMN "state",
ADD COLUMN     "country" TEXT NOT NULL;
