import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStatisticheGeneraliComponent } from './widget-statistiche-generali.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardComponent } from '../card/card.component';

describe('WidgetStatisticheGeneraliComponent', () => {
  let component: WidgetStatisticheGeneraliComponent;
  let fixture: ComponentFixture<WidgetStatisticheGeneraliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CardComponent, WidgetStatisticheGeneraliComponent ]
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
