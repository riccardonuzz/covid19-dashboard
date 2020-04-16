import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTotaleGuaritiComponent } from './widget-totale-guariti.component';

describe('WWidgetTotaleGuaritiComponent', () => {
  let component: WidgetTotaleGuaritiComponent;
  let fixture: ComponentFixture<WidgetTotaleGuaritiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTotaleGuaritiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTotaleGuaritiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
