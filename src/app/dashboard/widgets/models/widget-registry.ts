import { WidgetStatisticheGeneraliComponent } from '../widget-statistiche-generali/widget-statistiche-generali.component';
import { WidgetAndamentoNazionaleComponent } from '../widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetCComponent } from '../widget-c/widget-c.component';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { GridsterItem } from 'angular-gridster2';

export class DynamicWidget {
    name: string;
    component: Type<any>;
    dashboardUpdate$?: Observable<GridsterItem>;

    constructor(name: string, component: Type<any>, dashboardUpdate$?: Observable<GridsterItem>) {
        this.name = name;
        this.component = component;
        this.dashboardUpdate$ = dashboardUpdate$;
    }
}

export class WidgetRegistry {
    private static widgetList: DynamicWidget[] = [
        new DynamicWidget(WidgetStatisticheGeneraliComponent.config.type, WidgetStatisticheGeneraliComponent),
        new DynamicWidget(WidgetAndamentoNazionaleComponent.config.type, WidgetAndamentoNazionaleComponent),
        new DynamicWidget(WidgetCComponent.config.type, WidgetCComponent)
    ];

    static getWidgetList() {
        return WidgetRegistry.widgetList;
    }
}