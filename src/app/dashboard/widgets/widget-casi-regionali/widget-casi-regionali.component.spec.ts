import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCasiRegionaliComponent } from './widget-casi-regionali.component';

describe('WidgetCasiRegionaliComponent', () => {
  let component: WidgetCasiRegionaliComponent;
  let fixture: ComponentFixture<WidgetCasiRegionaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetCasiRegionaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCasiRegionaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
