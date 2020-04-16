import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTotaleDecedutiComponent } from './widget-totale-deceduti.component';

describe('WidgetTotaleDecedutiComponent', () => {
  let component: WidgetTotaleDecedutiComponent;
  let fixture: ComponentFixture<WidgetTotaleDecedutiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTotaleDecedutiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTotaleDecedutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
