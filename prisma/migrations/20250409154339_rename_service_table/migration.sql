/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "BookingService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL DEFAULT 'UTILITY',
    "amount" INTEGER NOT NULL,
    "amount_unit" "ServiceAmountUnit" NOT NULL DEFAULT 'DURATION',
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "BookingService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookingService_name_key" ON "BookingService"("name");
