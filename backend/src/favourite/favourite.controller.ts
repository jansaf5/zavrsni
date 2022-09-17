import { ApiTags } from '@nestjs/swagger';
import { FavouriteService } from './favourite.service';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { User } from '../user/user.decorator';
import { Favourite } from '@prisma/client';
import { DocsAddFavourite, DocsGetFavourites, DocsRemoveFavourite } from './favourite.controller.docs';
import { AddFavouriteDto } from './dto-in/addFavourite.dto';

@ApiTags('Favourite')
@Controller('favourite')
export class FavouriteController {
    constructor(private favouriteService: FavouriteService) { }

    @DocsAddFavourite()
    @UseGuards(JwtAuthGuard)
    @Post()
    async addFavourite(
        @User() user,
        @Body() addFavouriteDto: AddFavouriteDto
    ): Promise<boolean> {
        const { name } = addFavouriteDto;
        const response = await this.favouriteService.addFavourite({
            where: { email: user.email },
            createInput: { name }
        });
        return response;
    }

    @DocsRemoveFavourite()
    @UseGuards(JwtAuthGuard)
    @Delete()
    async removeFavourite(
        @User() user,
        @Body('name') name: string
    ): Promise<boolean> {
        const response = await this.favouriteService.removeFavourite({
            where: { email: user.email },
            favourite: { name }
        });
        return response;
    }

    @DocsGetFavourites()
    @UseGuards(JwtAuthGuard)
    @Get()
    async getFavourites(
        @User() user,
    ): Promise<Favourite[]> {
        const response = await this.favouriteService.getFavourites({ email: user.email });
        return response;
    }
}
