import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-card-bookmark',
  templateUrl: './card-bookmark.component.html',
  styleUrls: ['./card-bookmark.component.scss'],
})
export class CardBookmarkComponent implements OnInit {
  @Input() photo?: Photo;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  delete(): void {
    this.onDelete.emit(this.photo?.id);
  }

  select(): void {
    this.onSelect.emit(this.photo?.url_z);
  }
}
