import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Photo } from 'src/app/models/photo.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {

  bookmarks: Photo[] = [];
  imageUrl: string = '';
  isShowImage: boolean = false;
  paginationOptions = {
    itemsPerPage: 100,
    currentPage: 1,
    totalItems: 0,
  };
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.bookmarks$.pipe(takeUntil(this.unsubscribe$))
    .subscribe(photos => {
      this.bookmarks = photos;
    });
    this.storeService.getPhotos();
  }
  
  setPage(page: number): void {
    this.paginationOptions.currentPage = page;
  }

  deleteBookmark(id: string):void {
    this.storeService.delete(id);
  }

  showImage(url: string): void {
    this.imageUrl = url;
    this.isShowImage = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
