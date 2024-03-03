import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameslistComponent } from './frameslist.component';

describe('FrameslistComponent', () => {
  let component: FrameslistComponent;
  let fixture: ComponentFixture<FrameslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
