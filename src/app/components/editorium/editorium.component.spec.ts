import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoriumComponent } from './editorium.component';

describe('EditoriumComponent', () => {
  let component: EditoriumComponent;
  let fixture: ComponentFixture<EditoriumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditoriumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditoriumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
