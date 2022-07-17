/*
  Warnings:

  - Added the required column `avtar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "followers" INTEGER,
    "folllwoing" INTEGER,
    "Repos" INTEGER,
    "avtar" TEXT NOT NULL,
    "githuburl" TEXT NOT NULL,
    "githubtoken" TEXT NOT NULL
);
INSERT INTO "new_User" ("Repos", "folllwoing", "followers", "githubtoken", "githuburl", "id", "username") SELECT "Repos", "folllwoing", "followers", "githubtoken", "githuburl", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
