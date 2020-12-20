import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThemeModule } from './theme/theme.module';
import { GridsterModule } from 'angular-gridster2';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ToggleButtonComponent } from './header/toggle-button/toggle-button.component';
import { CardComponent } from './dashboard/widgets/card/card.component';
import { WidgetAndamentoNazionaleComponent } from './dashboard/widgets/widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetAndamentoVariazioniComponent } from './dashboard/widgets/widget-andamento-variazioni/widget-andamento-variazioni.component';
import { GenericWidgetComponent } from './dashboard/widgets/generic-widget/generic-widget.component';
import { GenericWidgetDirective } from './dashboard/widgets/generic-widget/generic-widget-directive/generic-widget.directive';
import { HttpInterceptorService } from './http-interceptor.service';

import { registerLocaleData, DatePipe, DecimalPipe } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeItExtra from '@angular/common/locales/extra/it';
import { TabComponent } from './dashboard/widgets/tab/tab.component';
import { WidgetRipartizioneCasiTotaliComponent } from './dashboard/widgets/widget-ripartizione-casi-totali/widget-ripartizione-casi-totali.component';
import { WidgetTotaleCasiComponent } from './dashboard/widgets/widget-totale-casi/widget-totale-casi.component';
import { WidgetTotalePositiviComponent } from './dashboard/widgets/widget-totale-positivi/widget-totale-positivi.component';
import { WidgetTotaleGuaritiComponent } from './dashboard/widgets/widget-totale-guariti/widget-totale-guariti.component';
import { WidgetTotaleDecedutiComponent } from './dashboard/widgets/widget-totale-deceduti/widget-totale-deceduti.component';
import { WidgetTotaleTerapiaIntensivaComponent } from './dashboard/widgets/widget-totale-terapia-intensiva/widget-totale-terapia-intensiva.component';
import { WidgetTotaleTamponiComponent } from './dashboard/widgets/widget-totale-tamponi/widget-totale-tamponi.component';
import { WidgetBulletinListComponent } from './dashboard/widgets/widget-bulletin-list/widget-bulletin-list.component';
import { WidgetCasiRegionaliComponent } from './dashboard/widgets/widget-casi-regionali/widget-casi-regionali.component';

registerLocaleData(localeIt, 'it-IT', localeItExtra);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ToggleButtonComponent,
    CardComponent,
    WidgetAndamentoNazionaleComponent,
    WidgetAndamentoVariazioniComponent,
    GenericWidgetComponent,
    GenericWidgetDirective,
    TabComponent,
    WidgetRipartizioneCasiTotaliComponent,
    WidgetTotaleCasiComponent,
    WidgetTotalePositiviComponent,
    WidgetTotaleGuaritiComponent,
    WidgetTotaleDecedutiComponent,
    WidgetTotaleTerapiaIntensivaComponent,
    WidgetTotaleTamponiComponent,
    WidgetBulletinListComponent,
    WidgetCasiRegionaliComponent
  ],
  imports: [
    BrowserModule,
    ThemeModule,
    GridsterModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    DatePipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
