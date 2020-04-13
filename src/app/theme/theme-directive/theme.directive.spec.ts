import { Component, DebugElement } from '@angular/core';
import { ThemeDirective } from './theme.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SupportedThemes, themes } from '../themes';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'my-test-component',
  template: ''
})
class TestComponent { }

class MockedThemeService {
  static currentTheme = SupportedThemes.LIGHT_THEME;
  public getActiveTheme() {
    return of(MockedThemeService.currentTheme);
  }

  public setActiveTheme(theme: SupportedThemes) { }
}

describe('ThemeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ThemeDirective
      ],
      providers: [
        { provide: ThemeService, useClass: MockedThemeService }
      ]
    });
  });

  beforeEach(async () => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: '<div appTheme></div>'
      }
    });
    await TestBed.compileComponents()
    fixture = TestBed.createComponent(TestComponent);
    directiveEl = fixture.debugElement.query(By.directive(ThemeDirective));
  });

  it('Should create an instance', async () => {
    expect(directiveEl).not.toBeNull();
  });

  it('Should correctly update theme in component and document.body', () => {
    const directiveInstance = directiveEl.injector.get(ThemeDirective);
    const documentInstance = directiveEl.injector.get(DOCUMENT);
    directiveInstance.updateTheme(SupportedThemes.LIGHT_THEME);
    fixture.detectChanges();
    
    // checking that css vars are correctly applied on element
    Object.keys(themes.lightTheme).forEach(cssProperty => {
      expect(themes.lightTheme[cssProperty]).toEqual(directiveEl.styles[cssProperty]);
    });

    // checking that css vars are correctly setted on body
    const styleValues = Object.values(documentInstance.body.style);
    Object.keys(themes.lightTheme).forEach(cssProperty => {
        expect(styleValues).toContain(cssProperty);
    });
  });

  it('Should correctly initialize theme', () => {
    const directiveInstance: ThemeDirective = directiveEl.injector.get(ThemeDirective);
    const documentInstance = directiveEl.injector.get(DOCUMENT);
    directiveInstance.ngOnInit();
    fixture.detectChanges();

     // checking that css vars are correctly applied on element
     Object.keys(themes.lightTheme).forEach(cssProperty => {
      expect(themes.lightTheme[cssProperty]).toEqual(directiveEl.styles[cssProperty]);
    });

    // checking that css vars are correctly setted on body
    const styleValues = Object.values(documentInstance.body.style);
    Object.keys(themes.lightTheme).forEach(cssProperty => {
        expect(styleValues).toContain(cssProperty);
    });
  });
});
