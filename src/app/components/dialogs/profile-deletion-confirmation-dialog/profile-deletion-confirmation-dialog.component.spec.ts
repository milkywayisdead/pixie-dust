import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeletionConfirmationDialogComponent } from './profile-deletion-confirmation-dialog.component';

describe('ProfileDeletionConfirmationDialogComponent', () => {
  let component: ProfileDeletionConfirmationDialogComponent;
  let fixture: ComponentFixture<ProfileDeletionConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDeletionConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileDeletionConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
