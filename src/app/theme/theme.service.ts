import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { SupportedThemes } from './themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme = new BehaviorSubject(SupportedThemes.LIGHT_THEME);
  private THEME_KEY = 'currentTheme';

  constructor() { }

  public getActiveTheme() {
    return this.activeTheme.asObservable();
  }

  public setActiveTheme(name: SupportedThemes) {
    this.activeTheme.next(name);
    localStorage.setItem(this.THEME_KEY, name);
  }

  public initializeTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as SupportedThemes;
    if (savedTheme) {
      this.setActiveTheme(savedTheme);
    }
  }
}
