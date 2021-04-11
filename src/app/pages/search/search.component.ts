import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Photo, Photos } from 'src/app/models/photo.model';
import { SearchService } from 'src/app/services/search.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('input') input!: ElementRef;
  value: string = '';
  photos?: Photos;
  loading: boolean = false;
  imageUrl: string = '';
  isShowImage: boolean = false;
  paginationOptions = {
    itemsPerPage: 100,
    currentPage: 1,
    totalItems: 0,
  };

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private searchService: SearchService,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.searchService.search$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((photos) => {
        if (photos) {
          this.photos = photos;
          this.photos.photo.map((photo) => {
            photo.isSaved = this.store.checkSaved(photo.id);
            photo.tags = this.store.checkTags(photo.id);
            return photo;
          });
          this.paginationOptions.currentPage = photos.page;
          this.paginationOptions.totalItems = +photos.total;
        } else {
          this.photos = undefined;
        }
        this.loading = false;
      });

    setTimeout(() => {
      fromEvent(this.input.nativeElement, 'input')
        .pipe(takeUntil(this.unsubscribe$), debounceTime(1000))
        .subscribe(() => {
          if (this.value.trim()) {
            this.searchService.search({
              tags: this.value.trim(),
            });
            this.loading = true;
          } else {
            this.searchService.clear();
          }
        });
    }, 100);

    this.value = sessionStorage.getItem('search') || '';
  }

  formatNumbers(num: string): string {
    let result = '';
    if (+num > 0) {
      result = num;
      if (result.length > 6) {
        // > 1 000 000
        let hundreds = result.substr(-3, 3);
        let thousand = result.substr(-6, 3);
        let millions = result.substr(0, result.length - 6);
        result = millions + ',' + thousand + ',' + hundreds;
      } else {
        if (result.length > 3) {
          // > 1000
          let hundreds = result.substr(-3, 3);
          let thousand = result.substr(0, result.length - 3);
          result = thousand + ',' + hundreds;
        }
      }
    } else {
      result = '0';
    }
    return result;
  }

  clearInput(): void {
    this.value = '';
    this.photos = undefined;
  }

  setPage(page: number): void {
    this.paginationOptions.currentPage = page;
    this.searchService.search({
      tags: this.value,
      page: page,
    });
    this.loading = true;
  }

  savePhoto(photo: Photo): void {
    this.store.addBookmark(photo);
  }

  showImage(url: string): void {
    this.imageUrl = url;
    this.isShowImage = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    sessionStorage.setItem('search', this.value);
  }
}
