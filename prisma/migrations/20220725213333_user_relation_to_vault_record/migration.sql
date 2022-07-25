-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VaultRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "importId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "savedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VaultRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VaultRecord_importId_fkey" FOREIGN KEY ("importId") REFERENCES "HighlightImport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VaultRecord" ("id", "importId", "savedOn", "userId") SELECT "id", "importId", "savedOn", "userId" FROM "VaultRecord";
DROP TABLE "VaultRecord";
ALTER TABLE "new_VaultRecord" RENAME TO "VaultRecord";
CREATE UNIQUE INDEX "VaultRecord_importId_key" ON "VaultRecord"("importId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
