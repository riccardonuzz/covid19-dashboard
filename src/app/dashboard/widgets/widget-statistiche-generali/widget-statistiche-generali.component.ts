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
    type: 'WIDGET_STATISTICHE_GENERALI'
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
