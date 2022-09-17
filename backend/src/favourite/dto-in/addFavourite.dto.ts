import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsString, Length } from "class-validator";

type AddFavouriteType = Pick<Prisma.FavouriteCreateInput, 'name'>

export class AddFavouriteDto implements AddFavouriteType {
    @Length(3, 3, {
        message: 'The favourite must be a three letter abbreviation of the coins full name.'
    })
    @IsNotEmpty({
        message: 'Invalid name entry.'
    })
    @IsString({
        message: 'Invalid name entry.'
    })
    @ApiProperty()
    name: string;
}