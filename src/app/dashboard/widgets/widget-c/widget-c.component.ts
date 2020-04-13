import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-c',
  templateUrl: './widget-c.component.html',
  styleUrls: ['./widget-c.component.scss']
})
export class WidgetCComponent implements OnInit {
  static config = {
    cols: 2,
    rows: 1,
    y: 1,
    x: 0,
    type: 'WIDGET_C'
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
