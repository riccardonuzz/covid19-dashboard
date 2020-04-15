import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericWidgetComponent } from './generic-widget.component';
import { WidgetRegistry } from '../models/widget-registry';
import { GenericWidgetDirective } from './generic-widget-directive/generic-widget.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';import { of } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { WidgetStatisticheGeneraliComponent } from '../widget-statistiche-generali/widget-statistiche-generali.component';

class MockedDashboardService {
    public getDashboardUpdate() {
        return of({});
    }
}

describe('GenericWidgetComponent', () => {
    let component: GenericWidgetComponent;
    let fixture: ComponentFixture<GenericWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, CommonModule, HttpClientTestingModule],
            declarations: [
                GenericWidgetComponent,
                GenericWidgetDirective,
                WidgetStatisticheGeneraliComponent
            ],
            providers: [
                { provide: DashboardService, useClass: MockedDashboardService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GenericWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should load a widget correctly', () => {
        const widgets = WidgetRegistry.getWidgetList();
        component.name = widgets[0].name;
        component.loadComponent();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-widget-statistiche-generali')).toBeTruthy();
    });

    it('Should load a widget correctly onInit', () => {
        const widgets = WidgetRegistry.getWidgetList();
        component.name = widgets[0].name;
        component.ngOnInit();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-widget-statistiche-generali')).toBeTruthy();
    });
});
