import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GridsterItem } from 'angular-gridster2';
import { DataService } from '../../data.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widget-bulletin-list',
  templateUrl: './widget-bulletin-list.component.html',
  styleUrls: ['./widget-bulletin-list.component.scss']
})
export class WidgetBulletinListComponent implements OnInit {
  static config: GridsterItem = {
    cols: 2,
    rows: 2,
    minItemCols: 2,
    minItemRows: 2,
    y: 1,
    x: 2,
    type: 'WIDGET_LISTA_BOLLETTINI'
  };

  bulletins: AndamentoNazionale[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAndamentoNazionale()
      .pipe(map(andamentoNazionale => {
        if (andamentoNazionale.length > 10) {
          return [
            ...andamentoNazionale
              .slice(Math.max(andamentoNazionale.length - 10, 0))
          ];
        } else return andamentoNazionale;
      }))
      .subscribe((andamentoNazionale: AndamentoNazionale[]) => {
        this.bulletins = andamentoNazionale.reverse();
      });
  }

}
