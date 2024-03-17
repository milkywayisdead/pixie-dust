import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDeletionConfirmationDialogComponent } from './group-deletion-confirmation-dialog.component';

describe('GroupDeletionConfirmationDialogComponent', () => {
  let component: GroupDeletionConfirmationDialogComponent;
  let fixture: ComponentFixture<GroupDeletionConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDeletionConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDeletionConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
