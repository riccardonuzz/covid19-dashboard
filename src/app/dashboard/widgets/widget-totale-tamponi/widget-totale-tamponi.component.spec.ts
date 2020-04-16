import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTotaleTamponiComponent } from './widget-totale-tamponi.component';

describe('WidgetTotaleCasiComponent', () => {
  let component: WidgetTotaleTamponiComponent;
  let fixture: ComponentFixture<WidgetTotaleTamponiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTotaleTamponiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTotaleTamponiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
