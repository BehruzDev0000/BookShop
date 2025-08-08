import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Kutubxona API')
    .setDescription('Kitoblar, foydalanuvchilar, mualliflar va ijaralar bilan ishlash uchun API hujjatlari')
    .setVersion('1.0')
    .addTag('Kutubxona') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/api/v1`);
    console.log(`📚 Swagger is available at http://localhost:${PORT}/api`);
  });
}

bootstrap();
