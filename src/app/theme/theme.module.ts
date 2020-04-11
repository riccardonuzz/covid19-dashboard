import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeDirective } from './theme-directive/theme.directive';
import { ThemeService } from './theme.service';

@NgModule({
  declarations: [
    ThemeDirective
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    ThemeDirective
  ],
  providers: [
    ThemeService
  ]
})
export class ThemeModule { }
