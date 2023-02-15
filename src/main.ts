import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //- nest 웹어플레케이션을 생성
  await app.listen(3000); //- 3000 포트로 서버를 띄움
}
bootstrap();