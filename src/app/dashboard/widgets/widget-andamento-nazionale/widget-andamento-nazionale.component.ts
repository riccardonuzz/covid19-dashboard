import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { DataService } from '../../data.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';

@Component({
  selector: 'app-widget-andamento-nazionale',
  templateUrl: './widget-andamento-nazionale.component.html',
  styleUrls: ['./widget-andamento-nazionale.component.scss']
})
export class WidgetAndamentoNazionaleComponent implements OnInit {
  static config: GridsterItem = {
    cols: 1,
    rows: 4,
    y: 0,
    x: 0,
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
