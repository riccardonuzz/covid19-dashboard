import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-b',
  templateUrl: './widget-b.component.html',
  styleUrls: ['./widget-b.component.scss']
})
export class WidgetBComponent implements OnInit {
  static config = {
    cols: 2,
    rows: 2,
    y: 0,
    x: 2,
    type: 'WIDGET_B'
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
