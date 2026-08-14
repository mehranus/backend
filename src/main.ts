import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT=process.env.PORT ?? 3000
  await app.listen(PORT,()=>{
    console.log(`server running in port : ${PORT}`)
  });
}
bootstrap();
