import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() open: boolean = false;
  @Output() onClose = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.open = false;
    this.onClose.emit();
  }
}
