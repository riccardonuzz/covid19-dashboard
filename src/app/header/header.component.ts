import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { SupportedThemes } from '../theme/themes';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  enabled: boolean;
  locked: boolean = true;
  themeSubscription: Subscription;

  constructor(private themeService: ThemeService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.themeSubscription = this.themeService.getActiveTheme()
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

  onLockToggle(enabled: boolean) {
    this.locked = enabled;
    this.dashboardService.enableWidgetEditing(enabled);
  }

  ngOnDestroy() {
    if (this.themeSubscription)
      this.themeSubscription.unsubscribe();
  }

}
