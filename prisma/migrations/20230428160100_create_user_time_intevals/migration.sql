/*
  Warnings:

  - You are about to drop the column `usernames` on the `users` table. All the data in the column will be lost.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "user_time_intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "week_day" INTEGER NOT NULL,
    "time_start_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "user_time_intervals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" DATETIME,
    "avatar_url" TEXT,
    "created_ate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("avatar_url", "created_ate", "email", "emailVerified", "id", "name") SELECT "avatar_url", "created_ate", "email", "emailVerified", "id", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
