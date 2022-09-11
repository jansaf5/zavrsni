import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
    providers: [UserService],
    imports: [PrismaModule],
    exports: [UserService]
})
export class UserModule { }
