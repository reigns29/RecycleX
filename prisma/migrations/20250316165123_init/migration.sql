-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('PENDING', 'MATCHED', 'SOLD');

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "estimatedPrice" DOUBLE PRECISION NOT NULL,
    "carbonFootprint" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "status" "ItemStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "preferredCategories" TEXT[],
    "maxPrice" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "rating" DOUBLE PRECISION,
    "totalTransactions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyerMatch" (
    "id" UUID NOT NULL,
    "buyerId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyerMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Item_userId_idx" ON "Item"("userId");

-- CreateIndex
CREATE INDEX "Item_category_idx" ON "Item"("category");

-- CreateIndex
CREATE INDEX "Item_status_idx" ON "Item"("status");

-- CreateIndex
CREATE INDEX "Item_latitude_longitude_idx" ON "Item"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Buyer_preferredCategories_idx" ON "Buyer"("preferredCategories");

-- CreateIndex
CREATE INDEX "Buyer_latitude_longitude_idx" ON "Buyer"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Buyer_isActive_idx" ON "Buyer"("isActive");

-- CreateIndex
CREATE INDEX "BuyerMatch_status_idx" ON "BuyerMatch"("status");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerMatch_buyerId_itemId_key" ON "BuyerMatch"("buyerId", "itemId");

-- AddForeignKey
ALTER TABLE "BuyerMatch" ADD CONSTRAINT "BuyerMatch_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerMatch" ADD CONSTRAINT "BuyerMatch_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
