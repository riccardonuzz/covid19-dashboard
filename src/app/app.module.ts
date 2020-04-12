import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './theme/theme.module';
import { GridsterModule } from 'angular-gridster2';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ToggleButtonComponent } from './header/toggle-button/toggle-button.component';
import { CardComponent } from './dashboard/widgets/card/card.component';
import { WidgetAComponent } from './dashboard/widgets/widget-a/widget-a.component';
import { WidgetBComponent } from './dashboard/widgets/widget-b/widget-b.component';
import { WidgetCComponent } from './dashboard/widgets/widget-c/widget-c.component';
import { GenericWidgetComponent } from './dashboard/widgets/generic-widget/generic-widget.component';
import { GenericWidgetDirective } from './dashboard/widgets/generic-widget/generic-widget-directive/generic-widget.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ToggleButtonComponent,
    CardComponent,
    WidgetAComponent,
    WidgetBComponent,
    WidgetCComponent,
    GenericWidgetComponent,
    GenericWidgetDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    WidgetAComponent,
    WidgetBComponent,
    WidgetCComponent
  ]
})
export class AppModule { }
