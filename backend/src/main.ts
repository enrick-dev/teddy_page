import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(true);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Teddy Open Finance API')
    .setDescription('API para teste na Teddy Open Finance')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer' })
    .addTag('Auth')
    .addTag('User')
    .addTag('Client')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
