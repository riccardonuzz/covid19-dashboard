import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-widget-b',
  templateUrl: './widget-b.component.html',
  styleUrls: ['./widget-b.component.scss']
})
export class WidgetBComponent implements OnInit {
  static config: GridsterItem = {
    cols: 2,
    rows: 2,
    y: 0,
    x: 2,
    type: 'WIDGET_B'
  };

  @ViewChild('lineChart', { static: true }) lineChartRef;

  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    setTimeout(() => this.lineChartRef.update(), 100);
    this.dashboardService.getDashboardUpdate().subscribe((dashboardUpdate: GridsterItem) => {
      this.lineChartRef.update();
    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
