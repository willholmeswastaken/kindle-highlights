-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "importId" TEXT NOT NULL,
    "totalHighlights" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Book_importId_fkey" FOREIGN KEY ("importId") REFERENCES "HighlightImport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "id", "importId", "title") SELECT "author", "id", "importId", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
