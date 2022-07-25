/*
  Warnings:

  - Added the required column `userId` to the `VaultRecord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VaultRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "importId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "VaultRecord_importId_fkey" FOREIGN KEY ("importId") REFERENCES "HighlightImport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VaultRecord" ("id", "importId") SELECT "id", "importId" FROM "VaultRecord";
DROP TABLE "VaultRecord";
ALTER TABLE "new_VaultRecord" RENAME TO "VaultRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
