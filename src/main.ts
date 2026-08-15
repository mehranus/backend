import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT=process.env.PORT ?? 3000
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
   setupSwagger(app);
  await app.listen(PORT,()=>{
    console.log(`server running in port : ${PORT}`)
  });
}
bootstrap();
