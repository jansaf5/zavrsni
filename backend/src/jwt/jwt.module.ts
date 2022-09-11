import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Module({
    imports: [
        UserModule,
        NestJwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        }),
    ],
    providers: [
        JwtStrategy,
        JwtService
    ],
    exports: [
        JwtStrategy,
        JwtService
    ]
})
export class JwtModule { }
