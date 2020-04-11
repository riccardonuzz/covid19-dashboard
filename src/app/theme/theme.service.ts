import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { SupportedThemes } from './themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme = new BehaviorSubject(SupportedThemes.LIGHT_THEME);

  constructor() { }

  public getActiveTheme() {
    return this.activeTheme.asObservable();
  }

  public setActiveTheme(name: SupportedThemes) {
    this.activeTheme.next(name);
    localStorage.setItem('currentTheme', name);
  }

  public initializeTheme() {
    const savedTheme = localStorage.getItem('currentTheme') as SupportedThemes;
    if (savedTheme) {
      this.setActiveTheme(savedTheme);
    }
  }
}
