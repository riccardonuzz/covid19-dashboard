import { WidgetAndamentoNazionaleComponent } from '../widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetBComponent } from '../widget-b/widget-b.component';
import { WidgetCComponent } from '../widget-c/widget-c.component';
import { Type } from '@angular/core';

export class DynamicWidget {
    name: string;
    component: Type<any>;

    constructor(name: string, component: Type<any>) {
        this.name = name;
        this.component = component;
    }
}

export class WidgetRegistry {
    private static widgetList: DynamicWidget[] = [
        new DynamicWidget(WidgetAndamentoNazionaleComponent.config.type, WidgetAndamentoNazionaleComponent),
        new DynamicWidget(WidgetBComponent.config.type, WidgetBComponent),
        new DynamicWidget(WidgetCComponent.config.type, WidgetCComponent)
    ];

    static getWidgetList() {
        return WidgetRegistry.widgetList;
    }
}