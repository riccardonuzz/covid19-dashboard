import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { DashboardService } from './dashboard/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private dashboardService: DashboardService
  ) {}
  
  ngOnInit() {
    this.themeService.initializeTheme();
    this.dashboardService.initializeDashboard();
  }
}
