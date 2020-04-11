import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { SupportedThemes } from '../theme/themes';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  protected enabled: boolean;
  
  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.getActiveTheme()
      .pipe(take(1))
      .subscribe((activeTheme) => {
        if (activeTheme === SupportedThemes.LIGHT_THEME)
          this.enabled = false;
        else 
          this.enabled = true;
      })
  }

  onToggle(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      this.themeService.setActiveTheme(SupportedThemes.DARK_THEME);
    } else {
      this.themeService.setActiveTheme(SupportedThemes.LIGHT_THEME);
    }
  }

}
