import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
 
  ngOnInit() {  
  }

  get options() {
    return this.dashboardService.getOptions();
  }

  get dashboard() {
    return this.dashboardService.getDasboard();
  }
}
