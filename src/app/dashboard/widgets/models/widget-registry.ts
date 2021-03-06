import { WidgetAndamentoNazionaleComponent } from '../widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetAndamentoVariazioniComponent } from '../widget-andamento-variazioni/widget-andamento-variazioni.component';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { GridsterItem } from 'angular-gridster2';
import { WidgetRipartizioneCasiTotaliComponent } from '../widget-ripartizione-casi-totali/widget-ripartizione-casi-totali.component';
import { WidgetTotaleCasiComponent } from '../widget-totale-casi/widget-totale-casi.component';
import { WidgetTotalePositiviComponent } from '../widget-totale-positivi/widget-totale-positivi.component';
import { WidgetTotaleGuaritiComponent } from '../widget-totale-guariti/widget-totale-guariti.component';
import { WidgetTotaleDecedutiComponent } from '../widget-totale-deceduti/widget-totale-deceduti.component';
import { WidgetTotaleTerapiaIntensivaComponent } from '../widget-totale-terapia-intensiva/widget-totale-terapia-intensiva.component';
import { WidgetTotaleTamponiComponent } from '../widget-totale-tamponi/widget-totale-tamponi.component';
import { WidgetBulletinListComponent } from '../widget-bulletin-list/widget-bulletin-list.component';
import { WidgetCasiRegionaliComponent } from '../widget-casi-regionali/widget-casi-regionali.component';

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
        new DynamicWidget(WidgetTotaleCasiComponent.config.type, WidgetTotaleCasiComponent),
        new DynamicWidget(WidgetTotalePositiviComponent.config.type, WidgetTotalePositiviComponent),
        new DynamicWidget(WidgetTotaleGuaritiComponent.config.type, WidgetTotaleGuaritiComponent),
        new DynamicWidget(WidgetTotaleDecedutiComponent.config.type, WidgetTotaleDecedutiComponent),
        new DynamicWidget(WidgetTotaleTerapiaIntensivaComponent.config.type, WidgetTotaleTerapiaIntensivaComponent),
        new DynamicWidget(WidgetTotaleTamponiComponent.config.type, WidgetTotaleTamponiComponent),
        new DynamicWidget(WidgetAndamentoNazionaleComponent.config.type, WidgetAndamentoNazionaleComponent),
        new DynamicWidget(WidgetAndamentoVariazioniComponent.config.type, WidgetAndamentoVariazioniComponent),
        new DynamicWidget(WidgetRipartizioneCasiTotaliComponent.config.type, WidgetRipartizioneCasiTotaliComponent),
        new DynamicWidget(WidgetBulletinListComponent.config.type, WidgetBulletinListComponent),
        new DynamicWidget(WidgetCasiRegionaliComponent.config.type, WidgetCasiRegionaliComponent),
    ];

    static getWidgetList() {
        return WidgetRegistry.widgetList;
    }
}