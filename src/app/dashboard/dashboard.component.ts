import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private dashboardService: DashboardService) {}

  get options(): GridsterConfig {
    return this.dashboardService.getOptions();
  }

  get dashboard(): GridsterItem[] {
    return this.dashboardService.getDashboard();
  }
}
