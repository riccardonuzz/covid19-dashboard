import { Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { themes } from '../themes';
import { ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {
  private themeName = 'whiteThemProps';
  private themServiceSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private themService: ThemeService
  ) { }

  ngOnInit() {
    this.updateTheme(this.themeName);
    this.themService.getActiveTheme().subscribe(themeName => {
      this.themeName = themeName;
      this.updateTheme(this.themeName);
    });
  }

  updateTheme(themeName: string) {
    const theme = themes[themeName];
    for (const key in theme) {
      // element.style.setProperty(key, theme[key]);
      this.renderer2.setStyle(this.elementRef.nativeElement, key, theme[key]);
      // this.renderer2.setStyle(this.document.body, key, theme[key]);
      this.document.body.style.setProperty(key, theme[key]);
    }
  }

  ngOnDestroy() {
    if (this.themServiceSubscription)
      this.themServiceSubscription.unsubscribe();
  }

}
