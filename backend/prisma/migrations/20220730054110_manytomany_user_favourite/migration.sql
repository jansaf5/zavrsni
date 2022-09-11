-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_userId_fkey";

-- CreateTable
CREATE TABLE "_FavouritesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavouritesToUser_AB_unique" ON "_FavouritesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouritesToUser_B_index" ON "_FavouritesToUser"("B");

-- AddForeignKey
ALTER TABLE "_FavouritesToUser" ADD CONSTRAINT "_FavouritesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesToUser" ADD CONSTRAINT "_FavouritesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
