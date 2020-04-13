import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, DisplayGrid, GridType, CompactType, GridsterItemComponent } from 'angular-gridster2';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { WidgetRegistry } from './widgets/models/widget-registry';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private options: GridsterConfig;
  private dashboard: GridsterItem[];
  private dashboardUpdate$: Subject<GridsterItem> = new Subject();

  constructor() {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 6,
      maxCols: 6,
      minRows: 6,
      maxRows: 6,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      itemChangeCallback: this.itemChange.bind(this),
      itemResizeCallback: this.itemResize.bind(this),
    };

    this.dashboardUpdate$
      .pipe(
        debounceTime(1000)
      )
      .subscribe((item: GridsterItem) => {
        localStorage.setItem('dashboardLayout', JSON.stringify(this.dashboard));
      });
  }

  public initializeDashboard() {
    const dashboardLayout = JSON.parse(localStorage.getItem('dashboardLayout')) as GridsterItem[];
    if (dashboardLayout && dashboardLayout.length > 0) {
      this.dashboard = dashboardLayout;
    } else {
      this.loadDefaultDashboardConfiguration();
    }
  }

  public getOptions(): GridsterConfig {
    return this.options;
  }

  public getDashboard(): GridsterItem[] {
    return this.dashboard;
  }

  private loadDefaultDashboardConfiguration() {
    this.dashboard = WidgetRegistry.getWidgetList().map(widget => (<any>widget.component).config);
  }

  private itemChange(item: GridsterItem, itemComponent: GridsterItemComponent) {
    this.dashboardUpdate$.next(item);
  }

  private itemResize(item: GridsterItem, itemComponent: GridsterItemComponent) {
    this.dashboardUpdate$.next(item);
  }

  private changedOptions() {
    this.options.api.optionsChanged();
  }
}
