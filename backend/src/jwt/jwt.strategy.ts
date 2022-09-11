import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        const { email } = payload;
        const user = await this.userService.user({ email });
        if (!user) {
            throw new UnauthorizedException("Invalid security token, please login again or contact support");
        } else {
            return payload;
        }
    }

    async signWithEmail(
        email: string
    ) {
        return {
            token: await this.jwtService.signAsync({ email: email })
        }
    }
}