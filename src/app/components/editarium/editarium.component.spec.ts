import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditariumComponent } from './editarium.component';

describe('EditariumComponent', () => {
  let component: EditariumComponent;
  let fixture: ComponentFixture<EditariumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditariumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditariumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
