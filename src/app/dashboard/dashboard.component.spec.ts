import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { GridsterConfig, GridsterModule } from 'angular-gridster2';
import { DashboardService } from './dashboard.service';
import { GenericWidgetComponent } from './widgets/generic-widget/generic-widget.component';
import { GenericWidgetDirective } from './widgets/generic-widget/generic-widget-directive/generic-widget.directive';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CardComponent } from '@swimlane/ngx-charts';
import { WidgetAndamentoNazionaleComponent } from './widgets/widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetTotaleCasiComponent } from './widgets/widget-totale-casi/widget-totale-casi.component';

class MockedDashboardService {
    getOptions() {
        return {} as GridsterConfig;
    }

    getDashboard() {
        return [WidgetTotaleCasiComponent.config];
    }

    getDashboardUpdate() {
        of({});
    }

}

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, GridsterModule],
            declarations: [
                DashboardComponent,
                CardComponent,
                GenericWidgetComponent,
                GenericWidgetDirective,
                WidgetTotaleCasiComponent,
                WidgetAndamentoNazionaleComponent
            ],
            providers: [
                { provide: DashboardService, useClass: MockedDashboardService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should get dashboard correctly', () => {
        expect(component.dashboard).toEqual([WidgetTotaleCasiComponent.config]);
    });

    it('Should get options correctly', () => {
        expect(component.options).toEqual({});
    });
});
