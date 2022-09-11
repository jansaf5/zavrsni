import { ValidationPipe, ClassSerializerInterceptor, INestApplication } from "@nestjs/common";
import { Reflector, HttpAdapterHost } from "@nestjs/core";
import { PrismaClientExceptionFilter } from "./prisma/prisma-client-exception.filter";

export const initAppGlobals = (
    app: INestApplication
) => {
    //validation and class transformer
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    //exceptions
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
}