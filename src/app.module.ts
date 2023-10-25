import { Module } from '@nestjs/common';
import { AlbumsModule } from './modules/albums/albums.module';
@Module({
  imports: [AlbumsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
