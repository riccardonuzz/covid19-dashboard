import { Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { themes, SupportedThemes } from '../themes';
import { ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {
  private themeName: SupportedThemes;
  private themServiceSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.themServiceSubscription = this.themeService.getActiveTheme()
      .subscribe(themeName => {
        this.themeName = themeName;
        this.updateTheme(this.themeName);
      });
  }

  updateTheme(themeName: string) {
    const theme = themes[themeName];
    for (const key in theme) {
      this.renderer2.setStyle(this.elementRef.nativeElement, key, theme[key]);
      this.document.body.style.setProperty(key, theme[key]);
    }
  }

  ngOnDestroy() {
    if (this.themServiceSubscription)
      this.themServiceSubscription.unsubscribe();
  }
}
