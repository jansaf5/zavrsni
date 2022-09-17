import { AuthService } from '../auth/auth.service';
import { AppModule } from "../app.module"
import { Test } from '@nestjs/testing'
import { PrismaService } from "../prisma/prisma.service";
import { HttpServer, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FavouriteService } from "./favourite.service";
import { Prisma } from '@prisma/client';
import { RegisterDto } from '../auth/dto-in/auth-register.dto';

describe('FavouriteController', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let favouriteService: FavouriteService;
    let authService: AuthService;
    let httpServer: HttpServer;
    let userToken: string;

    let favouriteDto: Required<Omit<Prisma.FavouriteWhereUniqueInput, 'id'>> = {
        name: 'test',
    }

    const registerDto: RegisterDto = {
        email: 'thisisa2nemail@gmail.com',
        firstName: 'George',
        lastName: 'Wax',
        password: '1234'
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();
        prisma = moduleRef.get<PrismaService>(PrismaService);
        favouriteService = moduleRef.get<FavouriteService>(FavouriteService);
        authService = moduleRef.get<AuthService>(AuthService);
        httpServer = app.getHttpServer();

        const { token } = await authService.registerUser({
            ...registerDto,
            
        });
        userToken = token;

        await app.listen(process.env.PORT || 3001);
    });



    describe('adds a new favourite', () => {
        it('requires authorization', async () => {
            const response: request.Response = await request(httpServer)
                .post('/favourite')
                .send(favouriteDto);
            expect(response.status).toBe(401);
        })

        it('returns confirmation that the addition was successful', async () => {
            const response: request.Response = await request(httpServer)
                .post('/favourite')
                .set('Authorization', `Bearer ${userToken}`)
                .send(favouriteDto);
            expect(response.status).toBe(201);
        });
    });

    describe('removes a favourite', () => {
        it('requires authorization', async () => {
            const response: request.Response = await request(httpServer)
                .delete('/favourite')
                .send(favouriteDto);
            expect(response.status).toBe(401);
        })

        it('returns confirmation that the removal was successful', async () => {
            const response: request.Response = await request(httpServer)
                .delete('/favourite')
                .set('Authorization', `Bearer ${userToken}`)
                .send(favouriteDto);
            expect(response.status).toBe(200);
        });
    });

    describe('returns favourites', () => {
        it('requires authorization', async () => {
            const response: request.Response = await request(httpServer)
                .get('/favourite')
            expect(response.status).toBe(401);
        })

        it('returns confirmation that the addition was successful', async () => {
            const response: request.Response = await request(httpServer)
                .get('/favourite')
                .set('Authorization', `Bearer ${userToken}`)
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    afterAll(async () => {
        await prisma.favourite.deleteMany({
            where: {
                User: {
                    every: {
                        email: registerDto.email
                    }
                }
            }
        });
        await prisma.user.delete({
            where: {
                email: registerDto.email
            }
        });
        await app.close();
    });
})