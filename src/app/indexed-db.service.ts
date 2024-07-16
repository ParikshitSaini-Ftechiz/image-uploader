import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase, DBSchema } from 'idb';

interface MyDB extends DBSchema {
  images: {
    key: string;
    value: {
      title: string;
      file: File;
      url: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    this.dbPromise = openDB<MyDB>('image-store', 1, {
      upgrade(db) {
        db.createObjectStore('images', { keyPath: 'title' });
      },
    });
  }

  async addImage(title: string, file: File, url: string) {
    const db = await this.dbPromise;
    await db.put('images', { title, file, url });
  }

  async getImages() {
    const db = await this.dbPromise;
    return await db.getAll('images');
  }

  async deleteImage(title: string) {
    const db = await this.dbPromise;
    await db.delete('images', title);
  }
}