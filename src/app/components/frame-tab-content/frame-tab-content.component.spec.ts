import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameTabContentComponent } from './frame-tab-content.component';

describe('FrameTabContentComponent', () => {
  let component: FrameTabContentComponent;
  let fixture: ComponentFixture<FrameTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameTabContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
