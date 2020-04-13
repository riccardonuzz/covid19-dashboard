import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-widget-a',
  templateUrl: './widget-a.component.html',
  styleUrls: ['./widget-a.component.scss']
})
export class WidgetAComponent implements OnInit {
  static config: GridsterItem = {
    cols: 2,
    rows: 1,
    y: 0,
    x: 0,
    type: 'WIDGET_A'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
