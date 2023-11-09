/*
  Warnings:

  - You are about to alter the column `accountNo` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `bankAccountAccountNo` on the `ReceivingAddress` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `description` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTermId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReceivingAddress" DROP CONSTRAINT "ReceivingAddress_bankAccountAccountNo_bankAccountUserId_fkey";

-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "accountNo" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "paymentTermId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReceivingAddress" ALTER COLUMN "bankAccountAccountNo" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Terms" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "invoiceId" TEXT,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Terms_value_key" ON "Terms"("value");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_paymentTermId_fkey" FOREIGN KEY ("paymentTermId") REFERENCES "Terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingAddress" ADD CONSTRAINT "ReceivingAddress_bankAccountAccountNo_bankAccountUserId_fkey" FOREIGN KEY ("bankAccountAccountNo", "bankAccountUserId") REFERENCES "BankAccount"("accountNo", "userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
