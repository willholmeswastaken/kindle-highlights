/*
  Warnings:

  - A unique constraint covering the columns `[vaultRecordId]` on the table `HighlightImport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[importId]` on the table `VaultRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HighlightImport" ADD COLUMN "vaultRecordId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "HighlightImport_vaultRecordId_key" ON "HighlightImport"("vaultRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "VaultRecord_importId_key" ON "VaultRecord"("importId");
