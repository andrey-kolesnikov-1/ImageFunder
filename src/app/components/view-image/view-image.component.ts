import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {

  @Input() open: boolean = false;
  @Output() onClose = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.open = false;
    this.onClose.emit();
  }

}
