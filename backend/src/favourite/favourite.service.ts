import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Favourites, Prisma } from '@prisma/client';

@Injectable()
export class FavouriteService {
    constructor(private prisma: PrismaService) { }

    async addFavourite(data: {
        where: Prisma.UserWhereUniqueInput, createInput: Prisma.FavouritesCreateInput
    }): Promise<boolean> {
        const { where, createInput } = data;
        const response = await this.prisma.user.update({
            data: {
                favourites: {
                    connectOrCreate: {
                        where: {
                            name: createInput.name
                        },
                        create: {
                            name: createInput.name
                        }
                    }
                }
            },
            where
        });
        return response ? true : false;
    }

    async removeFavourite(data: {
        where: Prisma.UserWhereUniqueInput,
        favourite: Pick<Favourites, 'name'>
    }): Promise<boolean> {
        const { where, favourite } = data;
        const response = await this.prisma.favourites.deleteMany({
            where: {
                AND: [
                    {
                        name: favourite.name,
                    },
                    {
                        User: {
                            some: where
                        }
                    }
                ]
            }
        });
        return response.count > 0 ? true : false;
    }

    async getFavourites(where: Prisma.UserWhereUniqueInput): Promise<Favourites[]> {
        const response = await this.prisma.favourites.findMany({
            where: {
                User: {
                    some: where
                }
            }
        });
        return response;
    }
}
