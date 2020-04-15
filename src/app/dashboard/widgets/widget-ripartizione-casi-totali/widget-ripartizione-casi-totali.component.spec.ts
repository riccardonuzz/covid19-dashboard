import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRipartizioneCasiTotaliComponent } from './widget-ripartizione-casi-totali.component';

describe('WidgetRipartizioneCasiTotaliComponent', () => {
  let component: WidgetRipartizioneCasiTotaliComponent;
  let fixture: ComponentFixture<WidgetRipartizioneCasiTotaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetRipartizioneCasiTotaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRipartizioneCasiTotaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
