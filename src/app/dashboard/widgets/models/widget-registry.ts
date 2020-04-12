import { WidgetAComponent } from '../widget-a/widget-a.component';
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
        new DynamicWidget('widget-a', WidgetAComponent),
        new DynamicWidget('widget-b', WidgetBComponent),
        new DynamicWidget('widget-c', WidgetCComponent)
    ];

    static getWidgetList() {
        return WidgetRegistry.widgetList;
    }
}