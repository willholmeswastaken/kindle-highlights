/*
  Warnings:

  - You are about to drop the column `vaultRecordId` on the `HighlightImport` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HighlightImport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "importedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "containsTitles" TEXT,
    "totalBookCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "HighlightImport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HighlightImport" ("containsTitles", "id", "importedOn", "totalBookCount", "userId") SELECT "containsTitles", "id", "importedOn", "totalBookCount", "userId" FROM "HighlightImport";
DROP TABLE "HighlightImport";
ALTER TABLE "new_HighlightImport" RENAME TO "HighlightImport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
