import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { DataService } from '../../data.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';

@Component({
  selector: 'app-widget-widget-totale-tamponi',
  templateUrl: './widget-totale-tamponi.component.html',
  styleUrls: ['./widget-totale-tamponi.component.scss']
})
export class WidgetTotaleTamponiComponent implements OnInit {
  static config: GridsterItem = {
    cols: 1,
    rows: 1,
    minItemCols: 1,
    maxItemCols: 1,
    minItemRows: 1,
    y: 0,
    x: 5,
    resizeEnabled: false,
    dragEnabled: false,
    compactEnabled: true,
    type: 'WIDGET_TOTALE_TAMPONI'
  };

  andamentoNazionale: AndamentoNazionale = null;
  nuoviTamponi: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAndamentoNazionale()
      .subscribe((andamentoNazionale: AndamentoNazionale[]) => {
        if (andamentoNazionale.length > 0) {
          this.andamentoNazionale = andamentoNazionale[andamentoNazionale.length - 1];
          const { length: l, [l - 1]: lastElement, [l - 2]: secondLastElement } = andamentoNazionale;
          this.nuoviTamponi = lastElement.tamponi - secondLastElement.tamponi;
        }
      });
  }

}
