-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('UTILITY', 'PRODUCT');

-- CreateEnum
CREATE TYPE "ServiceAmountUnit" AS ENUM ('DURATION', 'PRICE', 'USAGE');

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL DEFAULT 'UTILITY',
    "amount" INTEGER NOT NULL,
    "amount_unit" "ServiceAmountUnit" NOT NULL DEFAULT 'DURATION',
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");
