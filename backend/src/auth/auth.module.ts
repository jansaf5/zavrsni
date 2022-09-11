import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '../jwt/jwt.module';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        forwardRef(() => JwtModule),
        UserModule,
        PassportModule,
    ],
    exports: [AuthService],
})
export class AuthModule { }
