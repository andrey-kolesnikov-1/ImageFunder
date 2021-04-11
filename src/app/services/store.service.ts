import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private store: Map<string, Photo> = new Map<string, Photo>();
  bookmarks$: Subject<Photo[]> = new Subject<Photo[]>();

  constructor() {
    if (localStorage.getItem('images')) {
      this.store = new Map(JSON.parse(localStorage.getItem('images') || ''));
    }
   }

   getPhotos(): void {
     const photos: Photo[] = [];
    for (const item of this.store) {
      photos.unshift(item[1]);
    }
     this.bookmarks$.next(photos);
   }

  addBookmark(photo: Photo): void {
    this.store.set(photo.id, photo);
    this.save();
  }

  delete(id: string): void  {
    this.store.delete(id);
    this.save();
  }

  private save(): void  {
    localStorage.setItem('images', JSON.stringify([...this.store]));
    this.getPhotos();
  }

  checkSaved(id: string): boolean {
    return this.store.has(id);
  }

  checkTags(id: string): string {
    return this.store.get(id)?.tags || '';
  }
}
