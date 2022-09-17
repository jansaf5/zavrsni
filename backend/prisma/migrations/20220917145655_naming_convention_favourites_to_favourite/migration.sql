/*
  Warnings:

  - You are about to drop the `Favourites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavouritesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavouritesToUser" DROP CONSTRAINT "_FavouritesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavouritesToUser" DROP CONSTRAINT "_FavouritesToUser_B_fkey";

-- DropTable
DROP TABLE "Favourites";

-- DropTable
DROP TABLE "_FavouritesToUser";

-- CreateTable
CREATE TABLE "Favourite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavouriteToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_name_key" ON "Favourite"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FavouriteToUser_AB_unique" ON "_FavouriteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouriteToUser_B_index" ON "_FavouriteToUser"("B");

-- AddForeignKey
ALTER TABLE "_FavouriteToUser" ADD CONSTRAINT "_FavouriteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouriteToUser" ADD CONSTRAINT "_FavouriteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
