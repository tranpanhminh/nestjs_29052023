import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import config from '../ormconfig';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
