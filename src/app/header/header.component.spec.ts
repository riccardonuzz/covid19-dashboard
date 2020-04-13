import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ThemeService } from '../theme/theme.service';
import { of } from 'rxjs';
import { SupportedThemes } from '../theme/themes';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';

class MockedThemeService {
  static currentTheme = SupportedThemes.LIGHT_THEME;
  public getActiveTheme() {
    return of(MockedThemeService.currentTheme);
  }

  public setActiveTheme(theme: SupportedThemes) {}
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleButtonComponent, HeaderComponent],
      providers: [
        { provide: ThemeService, useClass: MockedThemeService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should correctly switch value with onToggle()', () => {
    component.onToggle(true);
    expect(component.enabled).toBe(true);

    component.onToggle(false);
    expect(component.enabled).toBe(false);
  });

  it('Should correctly initialize theme button', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.enabled).toBe(false);

    MockedThemeService.currentTheme = SupportedThemes.DARK_THEME;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.enabled).toBe(true);
  });

  it('Should correctly unsubscribe from service', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.themeSubscription.closed).toBe(true);
  });
});
