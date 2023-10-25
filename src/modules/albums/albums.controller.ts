import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Albums } from './type/albums.interface';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot({
  envFilePath: '.env',
});
const basePath = process.env.BASE_PATH;

@Controller(`${basePath}/albums`)
export class AlbumsController {
  constructor(public albumsService: AlbumsService) {}

  // Get All Albums
  @Get()
  async getAlbums(@Query() query): Promise<Albums[]> {
    const userId = query.userId;
    const page = query.page;
    const limit = query.limit;
    const sort = query.sort;
    const order = query.order;
    if (userId) {
      return await this.albumsService.filterByUserID(userId);
    } else if (page && limit) {
      return await this.albumsService.getAllPaginated(page, limit);
    } else if (sort && order) {
      return await this.albumsService.sortAndOrder(sort, order);
    } else {
      return await this.albumsService.getAlbums();
    }
  }

  // Create Album
  @Post('/add')
  async addAlbum(@Body() body): Promise<string> {
    return await this.albumsService.addAlbum(body);
  }
}
