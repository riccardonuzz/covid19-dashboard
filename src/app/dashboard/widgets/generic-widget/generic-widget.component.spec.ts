import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericWidgetComponent } from './generic-widget.component';

describe('GenericWidgetComponent', () => {
  let component: GenericWidgetComponent;
  let fixture: ComponentFixture<GenericWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
