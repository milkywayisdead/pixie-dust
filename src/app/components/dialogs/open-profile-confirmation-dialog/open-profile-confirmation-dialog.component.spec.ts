import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenProfileConfirmationDialogComponent } from './open-profile-confirmation-dialog.component';

describe('OpenProfileConfirmationDialogComponent', () => {
  let component: OpenProfileConfirmationDialogComponent;
  let fixture: ComponentFixture<OpenProfileConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenProfileConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenProfileConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
