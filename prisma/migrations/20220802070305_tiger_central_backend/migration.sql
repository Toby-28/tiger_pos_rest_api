-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barcodes" (
    "id" SERIAL NOT NULL,
    "itemsId" INTEGER NOT NULL,
    "itemUnitId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "lineNr" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barcodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "status" TEXT DEFAULT 'passive',
    "code" TEXT NOT NULL,
    "eCode" TEXT,
    "active" BOOLEAN,
    "eActive" BOOLEAN,
    "cardType" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "name2" TEXT,
    "name3" TEXT,
    "name4" TEXT,
    "specode1" TEXT,
    "specode2" TEXT,
    "specode3" TEXT,
    "specode4" TEXT,
    "specode5" TEXT,
    "keyword1" TEXT,
    "keyword2" TEXT,
    "keyword3" TEXT,
    "keyword4" TEXT,
    "keyword5" TEXT,
    "origin" TEXT,
    "category" TEXT,
    "mainUnit" TEXT NOT NULL,
    "mainUnitId" INTEGER NOT NULL,
    "brandId" INTEGER,
    "variationCode" TEXT,
    "reyonCode" TEXT,
    "producerCode" TEXT,
    "salesLimitQuantity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_title_key" ON "article"("title");

-- CreateIndex
CREATE UNIQUE INDEX "barcodes_itemsId_key" ON "barcodes"("itemsId");

-- CreateIndex
CREATE UNIQUE INDEX "barcodes_itemUnitId_key" ON "barcodes"("itemUnitId");

-- CreateIndex
CREATE UNIQUE INDEX "barcodes_barcode_key" ON "barcodes"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "items_code_key" ON "items"("code");

-- CreateIndex
CREATE UNIQUE INDEX "brands_code_key" ON "brands"("code");

-- AddForeignKey
ALTER TABLE "barcodes" ADD CONSTRAINT "barcodes_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
