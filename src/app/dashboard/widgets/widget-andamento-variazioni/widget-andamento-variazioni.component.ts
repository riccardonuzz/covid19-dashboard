import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { DataService } from '../../data.service';
import { Observable, Subscription } from 'rxjs';
import { Tab } from '../tab/tab';
import { SelectedData } from '../models/SelectedData';
import { ChartData } from '../models/chart';
import { SupportedThemes, themes } from 'src/app/theme/themes';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-widget-andamento-variazioni',
  templateUrl: './widget-andamento-variazioni.component.html',
  styleUrls: ['./widget-andamento-variazioni.component.scss']
})
export class WidgetAndamentoVariazioniComponent implements OnInit {
  static config: GridsterItem = {
    cols: 3,
    rows: 3,
    minItemCols: 2,
    minItemRows: 1,
    y: 3,
    x: 0,
    type: 'WIDGET_ANDAMENTO_VARIAZIONI'
  };

  @Input() dashboardUpdate$: Observable<GridsterItem>;
  @ViewChild('barChart', { static: true }) barChartRef;
  private dashboardUpdateSubscription: Subscription;

  // Chart Options
  legend: boolean = false;
  legendTitle: string = 'Legenda';
  showLabels: boolean = false;
  animations: boolean = false;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  showGridLines: boolean = false;
  colorScheme = {
    domain: []
  };

  // Chart data
  chartData: ChartData[] = [];
  variazionePositivi: ChartData[];
  variazioneGuariti: ChartData[];
  variazioneDeceduti: ChartData[];

  // Tabs options
  tabs: Tab[] = [{
    id: SelectedData.VARIAZIONE_POSITIVI,
    name: "Positivi"
  }, {
    id: SelectedData.VARIAZIONE_GUARITI,
    name: "Guariti"
  }, {
    id: SelectedData.VARIAZIONE_DECEDUTI,
    name: "Deceduti"
  }];

  constructor(private dataService: DataService, private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.getActiveTheme().subscribe((activeTheme: SupportedThemes) => {
      this.colorScheme = {
        domain: [themes[activeTheme]['--theme-chart-palette-1']]
      }
    });

    this.dashboardUpdateSubscription = this.dashboardUpdate$.subscribe((dashboardUpdate: GridsterItem) => {
      this.barChartRef.update();
    });

    this.dataService.getAndamentoNazionale()
      .subscribe((andamentoNazionale: AndamentoNazionale[]) => {
        this.mapVariazionePositiviToChart(andamentoNazionale);
        this.mapVariazioneDecedutiToChart(andamentoNazionale);
        this.mapVariazioneGuaritiToChart(andamentoNazionale);
      });
  }

  mapVariazionePositiviToChart(andamentoNazionale: AndamentoNazionale[]) {
    this.variazionePositivi = andamentoNazionale.map((singleAndamentoNazionale: AndamentoNazionale) => ({
      name: singleAndamentoNazionale.data.toString(),
      value: singleAndamentoNazionale.nuovi_positivi
    }));
    this.chartData = this.variazionePositivi;
  }

  mapVariazioneDecedutiToChart(andamentoNazionale: AndamentoNazionale[]) {
    this.variazioneDeceduti = andamentoNazionale.map((singleAndamentoNazionale: AndamentoNazionale, i, andamentoNazionaleWholeData) => {
      if (i === 0 && andamentoNazionaleWholeData[i + 1]) {
        return {
          name: andamentoNazionaleWholeData[i + 1].data.toString(),
          value: 0
        };
      }
      return {
        name: singleAndamentoNazionale.data.toString(),
        value: singleAndamentoNazionale.deceduti - andamentoNazionaleWholeData[i - 1].deceduti
      }
    });
  }

  mapVariazioneGuaritiToChart(andamentoNazionale: AndamentoNazionale[]) {
    this.variazioneGuariti = andamentoNazionale.map((singleAndamentoNazionale: AndamentoNazionale, i, andamentoNazionaleWholeData) => {
      if (i === 0 && andamentoNazionaleWholeData[i + 1]) {
        return {
          name: andamentoNazionaleWholeData[i + 1].data.toString(),
          value: 0
        };
      }
      return {
        name: singleAndamentoNazionale.data.toString(),
        value: singleAndamentoNazionale.dimessi_guariti - andamentoNazionaleWholeData[i - 1].dimessi_guariti
      }
    });
  }

  onTabChange(event: SelectedData) {
    switch (event) {
      case SelectedData.VARIAZIONE_GUARITI:
        this.chartData = [...this.variazioneGuariti];
        break;
      case SelectedData.VARIAZIONE_DECEDUTI:
        this.chartData = [...this.variazioneDeceduti];
        break;
      default:
        this.chartData = [...this.variazionePositivi];
        break;
    }
    this.barChartRef.update();
  }

  ngOnDestroy() {
    if (this.dashboardUpdateSubscription)
      this.dashboardUpdateSubscription.unsubscribe();
  }

}
