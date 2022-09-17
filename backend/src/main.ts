import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initAppDocumentation } from './app.docs';
import { initAppGlobals } from './app.globals';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    initAppGlobals(app);
    initAppDocumentation(app);

    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

    await app.listen(process.env.PORT || 9000);
    
}
bootstrap();
