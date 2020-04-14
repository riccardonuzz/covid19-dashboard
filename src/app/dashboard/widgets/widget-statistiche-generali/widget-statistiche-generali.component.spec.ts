import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStatisticheGeneraliComponent } from './widget-statistiche-generali.component';

describe('WidgetStatisticheGeneraliComponent', () => {
  let component: WidgetStatisticheGeneraliComponent;
  let fixture: ComponentFixture<WidgetStatisticheGeneraliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetStatisticheGeneraliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetStatisticheGeneraliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
