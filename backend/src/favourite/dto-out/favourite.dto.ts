import { ApiProperty } from '@nestjs/swagger';
import { Favourite as PrismaFavourites } from '@prisma/client'

interface PrismaFavouritesInterface extends PrismaFavourites { }

export class Favourite implements PrismaFavouritesInterface {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    userId: number | null;
}