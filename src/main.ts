import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tiger Central Backend API')
    .setDescription('NestJS API to interact Logo Tiger 3 API with easy!')
    .setVersion(process.env.APP_VERSION)
    .addTag('POS REST API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/${process.env.APP_VERSION}`, app, document);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
