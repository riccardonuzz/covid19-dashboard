import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { Observable, Subscription } from 'rxjs';
import { ChartData } from '../models/chart';
import { DataService } from '../../data.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { ThemeService } from 'src/app/theme/theme.service';
import { SupportedThemes, themes } from 'src/app/theme/themes';

@Component({
  selector: 'app-widget-ripartizione-casi-totali',
  templateUrl: './widget-ripartizione-casi-totali.component.html',
  styleUrls: ['./widget-ripartizione-casi-totali.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetRipartizioneCasiTotaliComponent implements OnInit {
  static config: GridsterItem = {
    cols: 2,
    rows: 3,
    minItemCols: 2,
    minItemRows: 2,
    y: 1,
    x: 4,
    resizeEnabled: false,
    dragEnabled: false,
    type: 'WIDGET_RIPARTIZIONE_CASI_TOTALI'
  };

  @Input() dashboardUpdate$: Observable<GridsterItem>;
  @ViewChild('pieChart', { static: true }) pieChartRef;
  private dashboardUpdateSubscription: Subscription;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  legendTitle: string = 'Legenda';
  animations: boolean = false;

  colorScheme = {
    domain: []
  };

  // Chart data
  chartData: ChartData[] = [];

  constructor(private dataService: DataService, private themeService: ThemeService) { }

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
      this.pieChartRef.update();
    });

    this.dataService.getAndamentoNazionale()
      .subscribe((andamentoNazionale: AndamentoNazionale[]) => {
        this.mapCasiTotaliToChart(andamentoNazionale);
      });
  }

  mapCasiTotaliToChart(andamentoNazionale: AndamentoNazionale[]) {
    const latestAndamentoNazionale = andamentoNazionale[andamentoNazionale.length - 1];
    this.chartData.push({
      name: 'Totale deceduti',
      value: latestAndamentoNazionale.deceduti
    });
    this.chartData.push({
      name: 'Totale dimessi/guariti',
      value: latestAndamentoNazionale.dimessi_guariti
    });
    this.chartData.push({
      name: 'Totale positivi',
      value: latestAndamentoNazionale.totale_positivi
    });
    this.chartData = [...this.chartData];
  }

  ngOnDestroy() {
    if (this.dashboardUpdateSubscription)
      this.dashboardUpdateSubscription.unsubscribe();
  }

}
