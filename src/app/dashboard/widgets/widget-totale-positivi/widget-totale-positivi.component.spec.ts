import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTotalePositiviComponent } from './widget-totale-positivi.component';

describe('WidgetTotaleCasiComponent', () => {
  let component: WidgetTotalePositiviComponent;
  let fixture: ComponentFixture<WidgetTotalePositiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTotalePositiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTotalePositiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
