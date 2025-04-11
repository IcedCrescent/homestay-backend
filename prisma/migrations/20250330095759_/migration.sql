-- CreateTable
CREATE TABLE "UserBooking" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "identity_card_number" TEXT NOT NULL,
    "booking_id" INTEGER NOT NULL,

    CONSTRAINT "UserBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBooking" ADD CONSTRAINT "UserBooking_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
