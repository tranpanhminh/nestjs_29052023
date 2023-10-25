import { Injectable } from '@nestjs/common';
import { Albums } from './type/albums.interface';
import { AlbumsRepository } from './albums.repository';

@Injectable()
export class AlbumsService {
  constructor(public albumsRepository: AlbumsRepository) {}

  // Get All Albums
  getAlbums(): Promise<Albums[]> {
    const albums = this.albumsRepository.getAlbums();
    return albums;
  }

  // Filter By User ID
  async filterByUserID(userId: number): Promise<Albums[]> {
    return await this.albumsRepository.filterByUserID(userId);
  }

  // Pagniated
  async getAllPaginated(page: number, limit: number): Promise<Albums[]> {
    return await this.albumsRepository.getAllPaginated(page, limit);
  }

  // Sort And Order
  async sortAndOrder(sort: string, order: string): Promise<Albums[]> {
    return await this.albumsRepository.sortAndOrder(sort, order);
  }

  // Add Album
  async addAlbum(body): Promise<string> {
    return await this.albumsRepository.addAlbum(body);
  }

  // Delete Album
  async deleteAlbum(id): Promise<string> {
    return await this.albumsRepository.deleteAlbum(id);
  }

  // Update Album
  async updateAlbum(id: number, body: Albums): Promise<string> {
    return await this.albumsRepository.updateAlbum(id, body);
  }
}
