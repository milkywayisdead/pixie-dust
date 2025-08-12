import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToGifDialogComponent } from './to-gif-dialog.component';

describe('ToGifDialogComponent', () => {
  let component: ToGifDialogComponent;
  let fixture: ComponentFixture<ToGifDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToGifDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToGifDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
