/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { Albums } from './type/albums.interface';
import { readFile, writeFile } from 'fs/promises';
import { keys } from 'ts-transformer-keys';
import { uuid } from 'uuidv4';
import * as path from 'path';
@Injectable()
export class AlbumsRepository {
  // Get All Albums
  async readAlbums(): Promise<Albums[]> {
    const readAlbums = await readFile(
      path.join('src/modules/albums', '/database/albums.json'),
      'utf8',
    );
    const albums = JSON.parse(readAlbums);
    return albums;
  }

  // Get All Albums
  async getAlbums(): Promise<Albums[]> {
    const albums = await this.readAlbums();
    return albums;
  }

  //   Filter By User ID
  async filterByUserID(userId: number): Promise<Albums[]> {
    const albums = await this.readAlbums();
    const filterAlbumByUserID = albums.filter((album: Albums) => {
      return album.userId == userId;
    });
    return filterAlbumByUserID;
  }

  //   Pagniated
  async getAllPaginated(page: number, limit: number): Promise<Albums[]> {
    const albums = await this.readAlbums();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex >= albums.length) {
      return []; // Không có dữ liệu trang này.
    }

    const paginatedAlbums = albums.slice(startIndex, endIndex);
    return paginatedAlbums;
  }

  // Sort And Order
  async sortAndOrder(sort: string, order: string): Promise<Albums[]> {
    const albums = await this.readAlbums();
    const allKeys = new Set();

    albums.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        allKeys.add(key);
      });
    });

    const arrayOfKeys = [...allKeys];
    console.log('Các keys:', arrayOfKeys);

    // Kiểm tra xem sort có trong arrayOfKeys không
    if (arrayOfKeys.includes(sort)) {
      const sortedAlbums = [...albums]; // Tạo một bản sao của mảng albums

      if (order === 'asc') {
        sortedAlbums.sort((a, b) => {
          if (typeof a[sort] === 'number') {
            return a[sort] - b[sort];
          } else if (typeof a[sort] === 'string') {
            return a[sort].localeCompare(b[sort]);
          }
        });
      } else if (order === 'desc') {
        sortedAlbums.sort((a, b) => {
          if (typeof a[sort] === 'number') {
            return b[sort] - a[sort];
          } else if (typeof a[sort] === 'string') {
            return b[sort].localeCompare(a[sort]);
          }
        });
      }

      return sortedAlbums;
    } else {
      // Trường sort không tồn tại trong arrayOfKeys
      // Trả về mảng ban đầu
      return albums;
    }
  }

  // Add Album
  async addAlbum(body): Promise<string> {
    const albums = await this.getAlbums();
    const copyAlbums = [...albums];
    const newAlbum = {
      id: Number(uuid),
      userId: body.userId,
      title: body.title,
    };
    copyAlbums.push(newAlbum);
    await writeFile(
      path.join('src/modules/albums', '/database/albums.json'),
      JSON.stringify(copyAlbums),
    );
    return 'Added';
  }

  // Delete Album
  async deleteAlbum(id): Promise<string> {
    const albums = await this.getAlbums();
    const copyAlbums = [...albums];

    const checkAlbum = copyAlbums.find((album: Albums) => {
      return album.id === Number(id);
    });
    if (checkAlbum) {
      const updatedAlbum = copyAlbums.filter((album: Albums) => {
        return album.id !== Number(id);
      });
      await writeFile(
        path.join('src/modules/albums', '/database/albums.json'),
        JSON.stringify(updatedAlbum),
      );
      return 'Deleted';
    } else {
      return 'Album Not Found';
    }
  }

  // Update Album
  async updateAlbum(id: number, body: Albums): Promise<string> {
    const albums = await this.getAlbums();
    const copyAlbums = [...albums];
    const checkAlbum = copyAlbums.find((album: Albums) => {
      return album.id === Number(id);
    });

    const findAlbumIndex = copyAlbums.findIndex((album: Albums) => {
      return album.id === Number(id);
    });

    if (checkAlbum) {
      const updatedAlbum: Albums = {
        id: !body.id ? checkAlbum.id : checkAlbum.id,
        userId: !body.userId ? checkAlbum.userId : body.userId,
        title: !body.title ? checkAlbum.title : body.title,
      };
      copyAlbums.splice(findAlbumIndex, 1, updatedAlbum);
      await writeFile(
        path.join('src/modules/albums', '/database/albums.json'),
        JSON.stringify(copyAlbums),
      );
      return 'Updated';
    } else {
      return 'Album Not Found';
    }
  }
}
