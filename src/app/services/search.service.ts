import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Photos, PhotosSearch } from '../models/photo.model';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class SearchService {

  private api_Key: string = 'b281e41ad0e9391a1d585d6cccd16d90';
  private url: string = 'https://www.flickr.com/services/rest/';
  // search$: Subject<Photos> = new Subject<Photos>();
  search$: BehaviorSubject<Photos | undefined> = new BehaviorSubject<Photos | undefined>(undefined);

  constructor(private http: HttpClient) {}
  
  search(params: any) {
    params['api_key'] = this.api_Key;
    params['method'] = 'flickr.photos.search';
    params['format'] = 'json';
    params['nojsoncallback'] = 1;
    params['extras'] = 'url_z';

    this.http.get<PhotosSearch>(this.url, {params}).pipe(take(1))
    .subscribe(result => {
      if (result.stat === 'ok') {
        this.search$.next(result.photos);
      } else {
        this.search$.next(undefined);
      }
    });
  }

  clear() {
    this.search$.next(undefined);
  }
}

