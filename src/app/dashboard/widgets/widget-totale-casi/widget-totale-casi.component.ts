import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-widget-totale-casi',
  templateUrl: './widget-totale-casi.component.html',
  styleUrls: ['./widget-totale-casi.component.scss']
})
export class WidgetTotaleCasiComponent implements OnInit {
  static config: GridsterItem = {
    cols: 1,
    rows: 1,
    minItemCols: 1,
    maxItemCols: 1,
    minItemRows: 1,
    y: 0,
    x: 0,
    resizeEnabled: false,
    dragEnabled: false,
    compactEnabled: true,
    type: 'WIDGET_TOTALE_CASI'
  };

  andamentoNazionale: AndamentoNazionale = null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAndamentoNazionale()
      .subscribe((andamentoNazionale: AndamentoNazionale[]) => {
        if (andamentoNazionale.length > 0)
          this.andamentoNazionale = andamentoNazionale[andamentoNazionale.length - 1];
      });
  }

}
