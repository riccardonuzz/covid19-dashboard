import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { ThemeService } from 'src/app/theme/theme.service';
import { SupportedThemes, themes } from 'src/app/theme/themes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-widget-andamento-nazionale',
  templateUrl: './widget-andamento-nazionale.component.html',
  styleUrls: ['./widget-andamento-nazionale.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetAndamentoNazionaleComponent implements OnInit {
  static config: GridsterItem = {
    cols: 2,
    rows: 2,
    minItemRows: 1,
    minItemCols: 2,
    y: 1,
    x: 0,
    resizeEnabled: false,
    dragEnabled: false,
    type: 'WIDGET_ANDAMENTO_NAZIONALE'
  };

  @Input() dashboardUpdate$: Observable<GridsterItem>;
  @ViewChild('lineChart', { static: true }) lineChartRef;
  private dashboardUpdateSubscription: Subscription;

  // Chart Options
  legend: boolean = true;
  legendTitle: string = 'Legenda';
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  showGridLines: boolean = false;
  chartData = [];
  colorScheme = {
    domain: []
  };

  constructor(private dataService: DataService, private themeService: ThemeService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.themeService.getActiveTheme().subscribe((activeTheme: SupportedThemes) => {
      this.colorScheme = {
        domain: [
          themes[activeTheme]['--theme-chart-palette-1'],
          themes[activeTheme]['--theme-chart-palette-2'],
          themes[activeTheme]['--theme-chart-palette-3']
        ]
      }
    });

    this.dashboardUpdateSubscription = this.dashboardUpdate$.subscribe((dashboardUpdate: GridsterItem) => {
      this.lineChartRef.update();
    });

    this.dataService.getAndamentoNazionale()
      .subscribe((andamentoNazionale: AndamentoNazionale[]) => {
        this.mapDataToChart(andamentoNazionale);
      });
  }

  mapDataToChart(andamentoNazionale: AndamentoNazionale[]) {
    const andamentoTotalePositivi = {
      name: "Totale positivi",
      series: []
    };
    const andamentoDeceduti = {
      name: "Totale deceduti",
      series: []
    };
    const andamentoDimessiGuariti = {
      name: "Totale dimessi/guariti",
      series: []
    };

    andamentoNazionale.forEach((andamentoNazionale: AndamentoNazionale) => {
      andamentoTotalePositivi.series.push({
        name: this.datePipe.transform(andamentoNazionale.data),
        value: andamentoNazionale.totale_positivi
      });
      andamentoDeceduti.series.push({
        name: this.datePipe.transform(andamentoNazionale.data),
        value: andamentoNazionale.deceduti
      });
      andamentoDimessiGuariti.series.push({
        name: this.datePipe.transform(andamentoNazionale.data),
        value: andamentoNazionale.dimessi_guariti
      });
    });

    this.chartData = [
      andamentoTotalePositivi,
      andamentoDeceduti,
      andamentoDimessiGuariti
    ];
  }

  ngOnDestroy() {
    if (this.dashboardUpdateSubscription)
      this.dashboardUpdateSubscription.unsubscribe();
  }
}
