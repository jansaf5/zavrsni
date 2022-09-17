import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async registerUser(userData: Prisma.UserCreateInput): Promise<AuthResponse> {
        console.log(userData);
        const hashedPassword = await this.hashPassword(userData.password);
        const formattedUser: Prisma.UserCreateInput = {
            ...userData,
            password: hashedPassword
        }
        const user: User = await this.userService.createUser(formattedUser);
        if (user) return await this.signedResponse(user);
    }

    async validateUser(
        data: {
            email: string,
            password: string
        }
    ): Promise<AuthResponse | null> {
        const { email, password } = data;
        const user = await this.userService.user({ email });
        if (user) {
            const hashedPassword = user.password;
            const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
            if (isPasswordMatching) return await this.signedResponse(user);
        } else {
            return null;
        }
    }

    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10); 
        return hashedPassword;
    }

    async signedResponse(
        user: User
    ): Promise<AuthResponse> {
        const { token } = await this.jwtService.signWithEmail(user.email);
        const response: AuthResponse = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token
        }
        return response;
    }
}
