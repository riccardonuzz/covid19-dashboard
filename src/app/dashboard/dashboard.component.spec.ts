import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { GridsterConfig, GridsterModule } from 'angular-gridster2';
import { WidgetAndamentoNazionaleComponent } from './widgets/widget-andamento-nazionale/widget-andamento-nazionale.component';
import { DashboardService } from './dashboard.service';
import { GenericWidgetComponent } from './widgets/generic-widget/generic-widget.component';
import { GenericWidgetDirective } from './widgets/generic-widget/generic-widget-directive/generic-widget.directive';

class MockedDashboardService {
    getOptions() {
        return {} as GridsterConfig;
    }

    getDashboard() {
        return [WidgetAndamentoNazionaleComponent.config];
    }
}

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ GridsterModule ],
            declarations: [
                DashboardComponent,
                GenericWidgetComponent,
                GenericWidgetDirective
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should get dashboard correctly', () => {
        expect(component.dashboard).toEqual([WidgetAndamentoNazionaleComponent.config]);
    });

    it('Should get options correctly', () => {
        expect(component.options).toEqual({});
    });
});
