import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtService {
    constructor(private jwtService: NestJwtService) { }

    async signWithEmail(
        email: string
    ) {
        return {
            token: await this.jwtService.signAsync({ email: email })
        }
    }
}