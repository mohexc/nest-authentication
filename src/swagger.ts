import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const createSwagger = (app) => {
    const config = new DocumentBuilder()
        .setTitle('Nest App')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);
}

export default createSwagger