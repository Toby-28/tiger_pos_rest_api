import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { AllCLIsModule } from './cli/AllCLIs.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  const config = new DocumentBuilder()
    .setTitle('ASMAN POS Tiger API')
    .setDescription('NestJS API to interact Logo Tiger 3 API with easy!')
    .setVersion(process.env.APP_VERSION)
    .addTag('POS REST API')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`api/${process.env.APP_VERSION}`, app, document);
  await app.listen(process.env.APP_PORT, () => {
    console.log(
      `
      --------------------------\n
      --> POSCentralAPI@${process.env.APP_PORT} <--\n
      --------------------------\n`,
    );
  });
}

// CLI Command to Syncronize Database
async function bootstrapCLI() {
  await CommandFactory.run(AllCLIsModule, new Logger());
}

bootstrap();
// bootstrapCLI();
