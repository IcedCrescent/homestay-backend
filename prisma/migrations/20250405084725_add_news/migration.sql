-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
