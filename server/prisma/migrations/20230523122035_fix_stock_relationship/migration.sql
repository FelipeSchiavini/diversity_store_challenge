/*
  Warnings:

  - Added the required column `productId` to the `StockMovements` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StockMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "StockMovements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StockMovements" ("id", "quantity", "userId") SELECT "id", "quantity", "userId" FROM "StockMovements";
DROP TABLE "StockMovements";
ALTER TABLE "new_StockMovements" RENAME TO "StockMovements";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
