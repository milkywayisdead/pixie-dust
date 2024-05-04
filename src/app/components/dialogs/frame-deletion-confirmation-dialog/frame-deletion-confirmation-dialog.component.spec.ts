import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameDeletionConfirmationDialogComponent } from './frame-deletion-confirmation-dialog.component';

describe('EmptyGroupDeletionConfirmationDialogComponent', () => {
  let component: FrameDeletionConfirmationDialogComponent;
  let fixture: ComponentFixture<FrameDeletionConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameDeletionConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameDeletionConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
