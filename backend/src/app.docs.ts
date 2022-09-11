import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initAppDocumentation = (
    app: INestApplication
) => {
    const config = new DocumentBuilder()
        .setTitle('Easy API')
        .setDescription('API for Easy\'s services')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}