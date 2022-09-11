import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [FavouriteService],
    controllers: [FavouriteController],
    exports: [FavouriteService]
})
export class FavouriteModule { }
