import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-widget-totale-terapia-intensivai',
  templateUrl: './widget-totale-terapia-intensiva.component.html',
  styleUrls: ['./widget-totale-terapia-intensiva.component.scss']
})
export class WidgetTotaleTerapiaIntensivaComponent implements OnInit {
  static config: GridsterItem = {
    cols: 1,
    rows: 1,
    minItemCols: 1,
    maxItemCols: 1,
    minItemRows: 1,
    y: 0,
    x: 4,
    resizeEnabled: false,
    dragEnabled: false,
    compactEnabled: true,
    type: 'WIDGET_TOTALE_TERAPIA_INTENSIVA'
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
