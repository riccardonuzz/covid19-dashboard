import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRipartizioneCasiTotaliComponent } from './widget-ripartizione-casi-totali.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subject, of } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from '../card/card.component';
import { DataService } from '../../data.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { SupportedThemes, themes } from 'src/app/theme/themes';


const mockedAndamentoNazionale: AndamentoNazionale[] = [
    {
        data: new Date("2020-02-24T18:00:00"),
        stato: "ITA",
        ricoverati_con_sintomi: 101,
        terapia_intensiva: 26,
        totale_ospedalizzati: 127,
        isolamento_domiciliare: 94,
        totale_positivi: 221,
        variazione_totale_positivi: 0,
        nuovi_positivi: 221,
        dimessi_guariti: 1,
        deceduti: 7,
        totale_casi: 229,
        tamponi: 4324,
        note_it: "",
        note_en: ""
    },
    {
        data: new Date("2020-02-25T18:00:00"),
        stato: "ITA",
        ricoverati_con_sintomi: 114,
        terapia_intensiva: 35,
        totale_ospedalizzati: 150,
        isolamento_domiciliare: 162,
        totale_positivi: 311,
        variazione_totale_positivi: 90,
        nuovi_positivi: 93,
        dimessi_guariti: 1,
        deceduti: 10,
        totale_casi: 322,
        tamponi: 8623,
        note_it: "",
        note_en: ""
    }
];


const chartData = [
    {
        name: "Totale deceduti",
        value: 10
    }, {
        name: "Totale dimessi/guariti",
        value: 1
    }, {
        name: "Totale positivi",
        value: 311
    }
];

class MockedDataService {
    getAndamentoNazionale() {
        return of(mockedAndamentoNazionale)
    }
}

class MockedThemeService {
    static currentTheme = SupportedThemes.LIGHT_THEME;
    public getActiveTheme() {
        return of(MockedThemeService.currentTheme);
    }

    public setActiveTheme(theme: SupportedThemes) { }
}

describe('WidgetRipartizioneCasiTotaliComponent', () => {
    let component: WidgetRipartizioneCasiTotaliComponent;
    let fixture: ComponentFixture<WidgetRipartizioneCasiTotaliComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule, NgxChartsModule],
            declarations: [CardComponent, WidgetRipartizioneCasiTotaliComponent],
            providers: [
                { provide: DataService, useClass: MockedDataService },
                { provide: ThemeService, useClass: MockedThemeService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetRipartizioneCasiTotaliComponent);
        component = fixture.componentInstance;
        component.dashboardUpdate$ = new Subject();
        // fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should correctly init', () => {
        const colorScheme = {
            domain: [
                themes[SupportedThemes.LIGHT_THEME]['--theme-chart-palette-1'],
                themes[SupportedThemes.LIGHT_THEME]['--theme-chart-palette-2'],
                themes[SupportedThemes.LIGHT_THEME]['--theme-chart-palette-3']
            ]
        };

        component.ngOnInit();
        component.dashboardUpdate$ = of(WidgetRipartizioneCasiTotaliComponent.config);
        expect(component.chartData).toEqual(chartData);
        expect(component.colorScheme).toEqual(colorScheme);
    });

    it('Should correctly map data to chart', () => {
        component.mapCasiTotaliToChart(mockedAndamentoNazionale);
        expect(component.chartData).toEqual(chartData);
    });
});
