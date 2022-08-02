-- CreateTable
CREATE TABLE "cases" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "address2" TEXT,
    "divisionNr" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divisions" (
    "id" SERIAL NOT NULL,
    "nr" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT,
    "doorNr" TEXT,
    "district" TEXT,
    "sity" TEXT,
    "country" TEXT,
    "zipCode" TEXT,
    "phone" TEXT,

    CONSTRAINT "divisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cases_code_key" ON "cases"("code");

-- CreateIndex
CREATE UNIQUE INDEX "cases_divisionNr_key" ON "cases"("divisionNr");

-- CreateIndex
CREATE UNIQUE INDEX "divisions_nr_key" ON "divisions"("nr");

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_divisionNr_fkey" FOREIGN KEY ("divisionNr") REFERENCES "divisions"("nr") ON DELETE RESTRICT ON UPDATE CASCADE;
