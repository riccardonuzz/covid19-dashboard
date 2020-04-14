import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';

@Component({
  selector: 'app-widget-andamento-nazionale',
  templateUrl: './widget-andamento-nazionale.component.html',
  styleUrls: ['./widget-andamento-nazionale.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetBComponent implements OnInit {
  static config: GridsterItem = {
    cols: 2,
    rows: 2,
    y: 0,
    x: 2,
    type: 'WIDGET_ANDAMENTO_NAZIONALE'
  };

  @Input() dashboardUpdate$: Observable<GridsterItem>;
  @ViewChild('lineChart', { static: true }) lineChartRef;
  private dashboardUpdateSubscription: Subscription;

  // Chart Options
  legend: boolean = true;
  legendTitle: string = 'Leggenda';
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
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
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
        name: andamentoNazionale.data,
        value: andamentoNazionale.totale_positivi
      });
      andamentoDeceduti.series.push({
        name: andamentoNazionale.data,
        value: andamentoNazionale.deceduti
      });
      andamentoDimessiGuariti.series.push({
        name: andamentoNazionale.data,
        value: andamentoNazionale.dimessi_guariti
      });
    });

    this.chartData = [
      andamentoTotalePositivi,
      andamentoDeceduti,
      andamentoDimessiGuariti
    ];
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnDestroy() {
    if (this.dashboardUpdateSubscription)
      this.dashboardUpdateSubscription.unsubscribe();
  }
}
