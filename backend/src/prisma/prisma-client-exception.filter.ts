import { Prisma } from '@prisma/client';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Please contact the support and inform them ab out this error.';

        const defaultMessage = 'Please contact the support and inform them about this error. Error code: ' + exception.code;

        //https://www.prisma.io/docs/reference/api-reference/error-reference
        switch (exception.code) {

            //Common
            case   'P1000'
                || 'P1001'
                || 'P1003'
                || 'P1008'
                || 'P1009'
                || 'P1010'
                || 'P1011'
                || 'P1012'
                || 'P1013'
                || 'P1014'
                || 'P1015'
                || 'P1016'
                || 'P1017':
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                message = defaultMessage;
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            //Prisma Client (Query Engine)
            case 'P2000':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'The provided value for the column is too long for the column\'s type.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2001':
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                message = 'Unable to complete operation';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2002':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Unique constraint failed.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2003':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Foreign key constraint failed.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2004':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'A constraint failed on the database.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2005':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'The value provided stored in the database for the specified field is invalid for it\'s type.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2006':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'The provided value for the model and it\'s desired field is not valid.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2007':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Data validation error.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2008'
                || 'P2009'
                || 'P2010'
                || 'P2014'
                || 'P2015'
                || 'P2016'
                || 'P2017'
                || 'P2021'
                || 'P2022'
                || 'P2023'
                || 'P2025'
                || 'P2026'
                || 'P2027'
                || 'P2030':
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                message = defaultMessage;
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2011':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Null constraint violation on the prased constraint.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2012':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Missing a required value at path.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2013':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Missing the required argument for field.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2018':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'The required connected records were not found.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2019':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Input error.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2020':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Value out of range for the type.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            case 'P2024':
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Timed out fetching a new connection from the connection pool.';
                response.status(statusCode).json({
                    statusCode,
                    message
                });
                break;

            //Prisma Migrate (Migration Engine)

            default:
                super.catch(exception, host);
                break;
        }
    }
}
