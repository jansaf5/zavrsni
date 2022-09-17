import { AuthService } from './auth.service';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto-in/auth-register.dto';
import { ApiTags } from '@nestjs/swagger';
import { DocsLogin, DocsRegister } from './auth.controller.docs';
import { LoginDto } from './dto-in/auth-login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @DocsLogin()
    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ): Promise<AuthResponse> {
        const response = await this.authService.validateUser({
            email: loginDto.email,
            password: loginDto.password
        });
        if (response) {
            return response;
        } else {
            throw new UnauthorizedException("Invalid credentials");
        }
    }

    @DocsRegister()
    @Post('register')
    async register(
        @Body() registerDto: RegisterDto
    ): Promise<AuthResponse> {
        return await this.authService.registerUser({
            email: registerDto.email,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            password: registerDto.password,
        })
    }
}
