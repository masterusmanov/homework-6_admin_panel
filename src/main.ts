import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
 
 const PORT = process.env.PORT || 2010;
 app.useGlobalPipes(new ValidationPipe());
 app.setGlobalPrefix('api');

 const config = new DocumentBuilder()
  .setTitle('NestJS TEST')
  .setDescription('REST API')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgres, Sequalize')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>{
    console.log(`${PORT}th port is running`);
  });
}
bootstrap();
