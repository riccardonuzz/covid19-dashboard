import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './theme/theme.module';
import { GridsterModule } from 'angular-gridster2';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ToggleButtonComponent } from './header/toggle-button/toggle-button.component';
import { CardComponent } from './dashboard/widgets/card/card.component';
import { WidgetStatisticheGeneraliComponent } from './dashboard/widgets/widget-statistiche-generali/widget-statistiche-generali.component';
import { WidgetAndamentoNazionaleComponent } from './dashboard/widgets/widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetCComponent } from './dashboard/widgets/widget-c/widget-c.component';
import { GenericWidgetComponent } from './dashboard/widgets/generic-widget/generic-widget.component';
import { GenericWidgetDirective } from './dashboard/widgets/generic-widget/generic-widget-directive/generic-widget.directive';
import { HttpInterceptorService } from './http-interceptor.service';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeItExtra from '@angular/common/locales/extra/it';
registerLocaleData(localeIt, 'it-IT', localeItExtra);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ToggleButtonComponent,
    CardComponent,
    WidgetStatisticheGeneraliComponent,
    WidgetAndamentoNazionaleComponent,
    WidgetCComponent,
    GenericWidgetComponent,
    GenericWidgetDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule,
    GridsterModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    WidgetStatisticheGeneraliComponent,
    WidgetAndamentoNazionaleComponent,
    WidgetCComponent
  ]
})
export class AppModule { }
