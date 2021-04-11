import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFoundImageComponent } from './card-found-image.component';

describe('CardFoundImageComponent', () => {
  let component: CardFoundImageComponent;
  let fixture: ComponentFixture<CardFoundImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFoundImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFoundImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
