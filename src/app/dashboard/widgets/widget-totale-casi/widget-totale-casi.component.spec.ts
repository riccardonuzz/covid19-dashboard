import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTotaleCasiComponent } from './widget-totale-casi.component';

describe('WidgetTotaleCasiComponent', () => {
  let component: WidgetTotaleCasiComponent;
  let fixture: ComponentFixture<WidgetTotaleCasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTotaleCasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTotaleCasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
