import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBookmarkComponent } from './card-bookmark.component';

describe('CardBookmarkComponent', () => {
  let component: CardBookmarkComponent;
  let fixture: ComponentFixture<CardBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
