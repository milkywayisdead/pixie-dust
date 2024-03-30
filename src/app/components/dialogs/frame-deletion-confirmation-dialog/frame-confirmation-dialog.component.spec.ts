import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyGroupDeletionConfirmationDialogComponent } from './empty-group-deletion-confirmation-dialog.component';

describe('EmptyGroupDeletionConfirmationDialogComponent', () => {
  let component: EmptyGroupDeletionConfirmationDialogComponent;
  let fixture: ComponentFixture<EmptyGroupDeletionConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyGroupDeletionConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyGroupDeletionConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
