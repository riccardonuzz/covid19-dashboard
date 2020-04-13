import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { WidgetAndamentoNazionaleComponent } from './widgets/widget-andamento-nazionale/widget-andamento-nazionale.component';
import { WidgetBComponent } from './widgets/widget-b/widget-b.component';
import { WidgetRegistry } from './widgets/models/widget-registry';
import { GridsterItemComponent, GridsterItem } from 'angular-gridster2';

describe('DashboardService', () => {
    const defaultWidgetsConfig = [
        { ...WidgetAndamentoNazionaleComponent.config },
        { ...WidgetBComponent.config }
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
        WidgetAndamentoNazionaleComponent.config = defaultWidgetsConfig[0];
        WidgetBComponent.config = defaultWidgetsConfig[1];
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
        WidgetAndamentoNazionaleComponent.config.x = 2;
        WidgetBComponent.config.y = 0;

        const mockedDashboardConfig = [
            WidgetAndamentoNazionaleComponent.config,
            WidgetBComponent.config,
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
        WidgetAndamentoNazionaleComponent.config.x = 2;
        WidgetAndamentoNazionaleComponent.config.y = 4;

        service['dashboard'] = WidgetRegistry.getWidgetList().map(widget => (<any>widget.component).config);

        service['dashboardUpdate$'].subscribe((item: GridsterItem) => {
            expect(item).toEqual(WidgetAndamentoNazionaleComponent.config);
            expect(service.getDashboard()).toContain(WidgetAndamentoNazionaleComponent.config);
        });

        service['itemResize'](WidgetAndamentoNazionaleComponent.config, {} as GridsterItemComponent);
    });


    it('Should change layout on itemResize()', () => {
        WidgetAndamentoNazionaleComponent.config.x = 2;
        WidgetAndamentoNazionaleComponent.config.y = 4;

        service['dashboard'] = WidgetRegistry.getWidgetList().map(widget => (<any>widget.component).config);

        service['dashboardUpdate$'].subscribe((item: GridsterItem) => {
            expect(item).toEqual(WidgetAndamentoNazionaleComponent.config);
            expect(service.getDashboard()).toContain(WidgetAndamentoNazionaleComponent.config);
        });

        service['itemChange'](WidgetAndamentoNazionaleComponent.config, {} as GridsterItemComponent);
    });
});
