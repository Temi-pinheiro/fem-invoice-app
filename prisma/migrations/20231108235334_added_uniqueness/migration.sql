/*
  Warnings:

  - You are about to drop the column `client` on the `Invoice` table. All the data in the column will be lost.
  - The required column `id` was added to the `BankAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `clientName` to the `BillingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BillingAddress" ADD COLUMN     "clientName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "client",
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
