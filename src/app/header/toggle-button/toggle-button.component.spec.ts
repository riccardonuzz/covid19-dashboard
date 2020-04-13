import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButtonComponent } from './toggle-button.component';

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should correctly set className', () => {
    component.className = 'exampleClassName';
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.exampleClassName');
    expect(button).toBeTruthy();
  });

  it('Should correctly emit enabled/disabled value', () => {
    spyOn(component.onToggle, 'emit');
    component.enabled = true;
    fixture.detectChanges();
    component.onClick();
    fixture.detectChanges();
    expect(component.enabled).toBeFalsy();
    expect(component.onToggle.emit).toHaveBeenCalledWith(false);

    component.enabled = false;
    fixture.detectChanges();
    component.onClick();
    fixture.detectChanges();
    expect(component.enabled).toBeTruthy();
    expect(component.onToggle.emit).toHaveBeenCalledWith(true);
  });
});
