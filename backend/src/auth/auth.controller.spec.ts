import { AuthService } from './auth.service';
import { RegisterDto } from './dto-in/auth-register.dto';
import { AppModule } from "../app.module"
import { Test } from '@nestjs/testing'
import { PrismaService } from "../prisma/prisma.service";
import { HttpServer, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LoginDto } from './dto-in/auth-login.dto';

describe('AuthController', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let authService: AuthService;
    let httpServer: HttpServer;
    let userEmail: string;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();
        prisma = moduleRef.get<PrismaService>(PrismaService);
        authService = moduleRef.get<AuthService>(AuthService);
        httpServer = app.getHttpServer();
        await app.listen(process.env.PORT || 3000);

    });

    describe('Register', () => {
        let response: request.Response;
        const registerDto: RegisterDto = {
            email: 'thisisanemail@gmail.com',
            firstName: 'George',
            lastName: 'Wax',
            password: '1234'
        }
        userEmail = registerDto.email;


        it('returns expected response status', async () => {
            response = await request(httpServer).post('/auth/register').send(registerDto);

            expect(response.status).toBe(201);
        });
        it('returns a valid jwt token', () => {
            expect(response.body.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // jwt regex
        });
        it('returns the user with accurate data from the post', () => {
            expect(response.body.firstName).toEqual(registerDto.firstName);
            expect(response.body.lastName).toEqual(registerDto.lastName);
            expect(response.body.lastName).toEqual(registerDto.lastName);
            expect(response.body.email).toMatch(registerDto.email);
        });
    });

    describe('Login', () => {
        let response: request.Response;
        const loginDto: LoginDto = {
            email: 'thisisanemail@gmail.com',
            password: '1234'
        }
        userEmail = loginDto.email;

        it('returns expected response status', async () => {
            response = await request(httpServer).post('/auth/login').send(loginDto);

            expect(response.status).toBe(201);
        });
        it('returns a valid jwt token', () => {
            expect(response.body.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // jwt regex
        });
        it('returns the user with accurate data from the post', () => {
            expect(response.body.email).toEqual(loginDto.email);
            expect(response.body.email).toMatch(loginDto.email);
        });
    });

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                email: userEmail
            }
        });
        await app.close();
    });
})