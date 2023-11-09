/*
  Warnings:

  - Added the required column `amount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('paid', 'pending', 'overdue', 'draft');

-- DropIndex
DROP INDEX "Invoice_invoiceNum_key";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "client" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ReceivingAddress" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "bankAccountAccountNo" DOUBLE PRECISION,
    "bankAccountUserId" TEXT,

    CONSTRAINT "ReceivingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingAddress" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,

    CONSTRAINT "BillingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "bankName" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNo" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ReceivingAddress_invoiceId_key" ON "ReceivingAddress"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "BillingAddress_invoiceId_key" ON "BillingAddress"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_userId_key" ON "BankAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountNo_userId_key" ON "BankAccount"("accountNo", "userId");

-- AddForeignKey
ALTER TABLE "ReceivingAddress" ADD CONSTRAINT "ReceivingAddress_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingAddress" ADD CONSTRAINT "ReceivingAddress_bankAccountAccountNo_bankAccountUserId_fkey" FOREIGN KEY ("bankAccountAccountNo", "bankAccountUserId") REFERENCES "BankAccount"("accountNo", "userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingAddress" ADD CONSTRAINT "BillingAddress_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
