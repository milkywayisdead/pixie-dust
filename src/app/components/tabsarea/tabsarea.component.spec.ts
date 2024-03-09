import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsareaComponent } from './tabsarea.component';

describe('TabsareaComponent', () => {
  let component: TabsareaComponent;
  let fixture: ComponentFixture<TabsareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabsareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
