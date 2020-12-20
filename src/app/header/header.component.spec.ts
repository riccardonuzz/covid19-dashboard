import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';
import { WidgetTotaleCasiComponent } from '../dashboard/widgets/widget-totale-casi/widget-totale-casi.component';
import { ThemeService } from '../theme/theme.service';
import { SupportedThemes } from '../theme/themes';
import { HeaderComponent } from './header.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';

class MockedThemeService {
  static currentTheme = SupportedThemes.LIGHT_THEME;
  public getActiveTheme() {
    return of(MockedThemeService.currentTheme);
  }

  public setActiveTheme(theme: SupportedThemes) { }
}

class MockedDashboardService {
  enableWidgetEditing() { }

  getDashboard() {
    return [WidgetTotaleCasiComponent.config];
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleButtonComponent, HeaderComponent],
      providers: [
        { provide: ThemeService, useClass: MockedThemeService },
        { provide: DashboardService, useClass: MockedDashboardService }
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
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(component.themeSubscription.closed).toBe(true);
  });
});
