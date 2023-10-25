/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
})
export class AlbumsModule {}
