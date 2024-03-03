import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameSizeDialogComponent } from './frame-size-dialog.component';

describe('FrameSizeDialogComponent', () => {
  let component: FrameSizeDialogComponent;
  let fixture: ComponentFixture<FrameSizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameSizeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameSizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
