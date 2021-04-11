import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-card-found-image',
  templateUrl: './card-found-image.component.html',
  styleUrls: ['./card-found-image.component.scss']
})
export class CardFoundImageComponent implements OnInit {

  @Input() photo!: Photo;
  @Output() onSave: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  toBookmark(): void {
    this.onSave.emit(this.photo);
    this.photo.isSaved = true;
  }

  select(): void {
    this.onSelect.emit(this.photo?.url_z);
  }
}
