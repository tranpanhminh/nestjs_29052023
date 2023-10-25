import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

// Import DotENV
ConfigModule.forRoot({
  envFilePath: '.env',
});
const port = process.env.PORT;
// -----------------------------------

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
