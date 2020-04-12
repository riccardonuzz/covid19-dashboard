import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, DisplayGrid, GridType, CompactType } from 'angular-gridster2';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private options: GridsterConfig;
  private dashboard: Array<GridsterItem>;

  constructor() {
    // this.options = {
    //   itemChangeCallback: DashboardComponent.itemChange,
    //   itemResizeCallback: DashboardComponent.itemResize,
    // };

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
      minCols: 1,
      maxCols: 6,
      minRows: 1,
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
      scrollToNewItems: false
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0, type: 'widget-a' },
      { cols: 2, rows: 2, y: 0, x: 2, type: 'widget-b' },
      { cols: 2, rows: 1, y: 1, x: 0, type: 'widget-c' },
      // { cols: 2, rows: 1, y: 0, x: 0 },
      // { cols: 2, rows: 2, y: 0, x: 2, hasContent: true },
      // { cols: 1, rows: 1, y: 0, x: 4 },
      // { cols: 1, rows: 1, y: 2, x: 5 },
      // { cols: 1, rows: 1, y: 1, x: 0 },
      // { cols: 1, rows: 1, y: 1, x: 0 },
      // { cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2' },
      // { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
      // { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
      // { cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled' },
      // { cols: 1, rows: 1, y: 2, x: 6 }
    ];
  }

  public getOptions() {
    return this.options;
  }

  public getDasboard() {
    return this.dashboard;
  }

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }
}
