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
  private LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY = 'dashboardLayout';

  constructor() {
    this.options = {
      gridType: GridType.VerticalFixed,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 900,
      minCols: 6,
      maxCols: 6,
      minRows: 12,
      maxRows: 12,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 110,
      keepFixedHeightInMobile: true,
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
        localStorage.setItem(this.LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY, JSON.stringify(this.dashboard));
      });
  }

  public initializeDashboard() {
    const dashboardLayout = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY)) as GridsterItem[];
    const widgetListSize = WidgetRegistry.getWidgetList().length;
    if (dashboardLayout) {
      // if available widget change, setup again dashboard
      if (widgetListSize !== dashboardLayout.length) {
        localStorage.removeItem(this.LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY);
        this.loadDefaultDashboardConfiguration();
        this.dashboardUpdate$.next();
      } else if (dashboardLayout && dashboardLayout.length > 0) {
        this.dashboard = dashboardLayout;
      }
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

  public getDashboardUpdate() {
    return this.dashboardUpdate$.asObservable();
  }

  private loadDefaultDashboardConfiguration() {
    this.dashboard = WidgetRegistry.getWidgetList().map(widget => (<any>widget.component).config);
  }



  public itemChange(item: GridsterItem, itemComponent: GridsterItemComponent) {
    this.dashboardUpdate$.next(item);
  }

  private itemResize(item: GridsterItem, itemComponent: GridsterItemComponent) {
    this.dashboardUpdate$.next(item);
  }

  private changedOptions() {
    this.options.api.optionsChanged();
  }

  public enableWidgetEditing(enabled: boolean) {
    this.dashboard = [
      ...this.dashboard.map((item: GridsterItem) => ({
        ...item,
        dragEnabled: enabled,
        resizeEnabled: enabled
      }))
    ];
  }
}
