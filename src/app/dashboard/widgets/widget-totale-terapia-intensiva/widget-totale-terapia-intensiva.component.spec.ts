import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTotaleTerapiaIntensivaComponent } from './widget-totale-terapia-intensiva.component';

describe('WidgetTotaleCasiComponent', () => {
  let component: WidgetTotaleTerapiaIntensivaComponent;
  let fixture: ComponentFixture<WidgetTotaleTerapiaIntensivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTotaleTerapiaIntensivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTotaleTerapiaIntensivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
