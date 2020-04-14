import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { DataService } from '../../data.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';

@Component({
  selector: 'app-widget-statistiche-generali',
  templateUrl: './widget-statistiche-generali.component.html',
  styleUrls: ['./widget-statistiche-generali.component.scss']
})
export class WidgetStatisticheGeneraliComponent implements OnInit {
  static config: GridsterItem = {
    cols: 1,
    rows: 5,
    minItemCols: 1,
    maxItemCols: 1,
    minItemRows: 5,
    y: 0,
    x: 0,
    compactEnabled: true,
    type: 'WIDGET_ANDAMENTO_NAZIONALE'
  };

  andamentoNazionale: AndamentoNazionale = null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAndamentoNazionaleLatest()
      .subscribe((andamentoNazionale: AndamentoNazionale) => {
        this.andamentoNazionale = andamentoNazionale;
      });
  }
}
