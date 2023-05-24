-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productUrl" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'descrição do produto'
);
INSERT INTO "new_Product" ("id", "name", "price", "productUrl") SELECT "id", "name", "price", "productUrl" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
