import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './theme/theme.module';
import { GridsterModule } from 'angular-gridster2';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ToggleButtonComponent } from './header/toggle-button/toggle-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ToggleButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
