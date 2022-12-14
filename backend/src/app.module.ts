import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from './jwt/jwt.module';
import { FavouriteModule } from './favourite/favourite.module';
import { ApiCallsModule } from './api-calls/api-calls.module';

@Module({
    imports: [AuthModule, UserModule, PrismaModule, JwtModule, FavouriteModule, ApiCallsModule],
    providers: [PrismaService],
    exports: [],
})
export class AppModule { }
