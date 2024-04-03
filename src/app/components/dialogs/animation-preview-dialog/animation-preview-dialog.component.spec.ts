import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationPreviewDialogComponent } from './animation-preview-dialog.component';

describe('AnimationPreviewDialogComponent', () => {
  let component: AnimationPreviewDialogComponent;
  let fixture: ComponentFixture<AnimationPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationPreviewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
