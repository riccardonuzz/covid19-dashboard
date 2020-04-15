import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { WidgetStatisticheGeneraliComponent } from './widgets/widget-statistiche-generali/widget-statistiche-generali.component';
import { WidgetAndamentoNazionaleComponent } from './widgets/widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetRegistry } from './widgets/models/widget-registry';
import { GridsterItemComponent, GridsterItem } from 'angular-gridster2';

describe('DashboardService', () => {
    const defaultWidgetsConfig = [
        { ...WidgetStatisticheGeneraliComponent.config },
        { ...WidgetAndamentoNazionaleComponent.config }
    ];

    let service: DashboardService;

    let store = {};
    const mockedLocalStorage = {
        getItem: (key: string): string => {
            return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
            store[key] = `${value}`;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DashboardService);
        WidgetStatisticheGeneraliComponent.config = defaultWidgetsConfig[0];
        WidgetAndamentoNazionaleComponent.config = defaultWidgetsConfig[1];
    });

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should get options', () => {
        expect(service.getOptions()).toEqual(service['options']);
    });

    it('Should get dashboard layout', () => {
        expect(service.getDashboard()).toEqual(service['dashboard']);
    });

    it('Should initialize dashboard configuration from localStorage', () => {
        WidgetStatisticheGeneraliComponent.config.x = 2;
        WidgetAndamentoNazionaleComponent.config.y = 0;

        const mockedDashboardConfig = [
            WidgetStatisticheGeneraliComponent.config,
            WidgetAndamentoNazionaleComponent.config,
        ];

        mockedLocalStorage.setItem('dashboardLayout', JSON.stringify(mockedDashboardConfig));

        spyOn(localStorage, 'getItem')
            .and.callFake(mockedLocalStorage.getItem);
        service.initializeDashboard();

        expect(service.getDashboard().length).toEqual(2);
        expect(service.getDashboard()).toEqual(mockedDashboardConfig);
    });

    it('Should initialize dashboard default configuration', () => {
        mockedLocalStorage.setItem('dashboardLayout', null);
        spyOn(localStorage, 'getItem').and.callFake(mockedLocalStorage.getItem);
        service.initializeDashboard();
        
        expect(service.getDashboard().length)
            .toEqual(WidgetRegistry.getWidgetList().length);

        const dashboardConfig = WidgetRegistry.getWidgetList().map(widget => (<any>widget.component).config);
        expect(service.getDashboard()).toEqual(dashboardConfig);
    });

    it('Should change layout on itemResize()', () => {
        WidgetStatisticheGeneraliComponent.config.x = 2;
        WidgetStatisticheGeneraliComponent.config.y = 4;

        service['dashboard'] = WidgetRegistry.getWidgetList().map(widget => (<any>widget.component).config);

        service['dashboardUpdate$'].subscribe((item: GridsterItem) => {
            expect(item).toEqual(WidgetStatisticheGeneraliComponent.config);
            expect(service.getDashboard()).toContain(WidgetStatisticheGeneraliComponent.config);
        });

        service['itemResize'](WidgetStatisticheGeneraliComponent.config, {} as GridsterItemComponent);
    });


    it('Should change layout on itemResize()', () => {
        WidgetStatisticheGeneraliComponent.config.x = 2;
        WidgetStatisticheGeneraliComponent.config.y = 4;

        service['dashboard'] = WidgetRegistry.getWidgetList().map(widget => (<any>widget.component).config);

        service['dashboardUpdate$'].subscribe((item: GridsterItem) => {
            expect(item).toEqual(WidgetStatisticheGeneraliComponent.config);
            expect(service.getDashboard()).toContain(WidgetStatisticheGeneraliComponent.config);
        });

        service['itemChange'](WidgetStatisticheGeneraliComponent.config, {} as GridsterItemComponent);
    });
});
