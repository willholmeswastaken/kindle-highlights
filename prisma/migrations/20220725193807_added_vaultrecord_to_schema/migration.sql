-- CreateTable
CREATE TABLE "VaultRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "importId" TEXT NOT NULL,
    CONSTRAINT "VaultRecord_importId_fkey" FOREIGN KEY ("importId") REFERENCES "HighlightImport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
