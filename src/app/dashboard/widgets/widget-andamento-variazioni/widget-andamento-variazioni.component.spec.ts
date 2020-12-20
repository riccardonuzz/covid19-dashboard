import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { of, Subject  } from 'rxjs';

import { ThemeService } from 'src/app/theme/theme.service';
import { SupportedThemes, themes } from 'src/app/theme/themes';
import { DataService } from '../../data.service';
import { CardComponent } from '../card/card.component';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { SelectedData } from '../models/SelectedData';
import { TabComponent } from '../tab/tab.component';
import { WidgetAndamentoVariazioniComponent } from './widget-andamento-variazioni.component';


const mockedAndamentoNazionale: AndamentoNazionale[] = [
    {
        data: new Date('2020-02-24T18:00:00'),
        stato: 'ITA',
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
        note_it: '',
        note_en: ''
    },
    {
        data: new Date('2020-02-25T18:00:00'),
        stato: 'ITA',
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
        note_it: '',
        note_en: ''
    }
];

const variazionePositivi = [{
    name: mockedAndamentoNazionale[0].data.toString(),
    value: mockedAndamentoNazionale[0].nuovi_positivi
}, {
    name: mockedAndamentoNazionale[1].data.toString(),
    value: mockedAndamentoNazionale[1].nuovi_positivi
}];

const variazioneGuariti = [{
    name: mockedAndamentoNazionale[1].data.toString(),
    value: 0
}, {
    name: mockedAndamentoNazionale[1].data.toString(),
    value: mockedAndamentoNazionale[1].dimessi_guariti - mockedAndamentoNazionale[0].dimessi_guariti
}];

const variazioneDeceduti = [{
    name: mockedAndamentoNazionale[1].data.toString(),
    value: 0
}, {
    name: mockedAndamentoNazionale[1].data.toString(),
    value: mockedAndamentoNazionale[1].deceduti - mockedAndamentoNazionale[0].deceduti
}];

class MockedDataService {
    getAndamentoNazionale() {
        return of(mockedAndamentoNazionale);
    }
}

class MockedThemeService {
    static currentTheme = SupportedThemes.LIGHT_THEME;
    public getActiveTheme() {
        return of(MockedThemeService.currentTheme);
    }

    public setActiveTheme(theme: SupportedThemes) { }
}

class MockedDatePipe {
    transform(date: Date) {
        return date.toString();
    }
}

describe('WidgetAndamentoVariazioniComponent', () => {
    let component: WidgetAndamentoVariazioniComponent;
    let fixture: ComponentFixture<WidgetAndamentoVariazioniComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                NgxChartsModule
            ],
            declarations: [
                CardComponent,
                TabComponent,
                WidgetAndamentoVariazioniComponent
            ],
            providers: [
                { provide: DataService, useClass: MockedDataService },
                { provide: ThemeService, useClass: MockedThemeService },
                { provide: DatePipe, useClass: MockedDatePipe }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetAndamentoVariazioniComponent);
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
            ]
        };

        component.ngOnInit();
        component.dashboardUpdate$ = of(WidgetAndamentoVariazioniComponent.config);
        expect(component.colorScheme).toEqual(colorScheme);
        expect(component.variazionePositivi).toEqual(variazionePositivi);
        expect(component.variazioneGuariti).toEqual(variazioneGuariti);
        expect(component.variazioneDeceduti).toEqual(variazioneDeceduti);
        expect(component.chartData).toEqual(variazionePositivi);
    });

    it('Should correctly map variazione positivi to chart', () => {
        component.mapVariazionePositiviToChart(mockedAndamentoNazionale);
        expect(component.variazionePositivi).toEqual(variazionePositivi);
        expect(component.chartData).toEqual(variazionePositivi);
    });

    it('Should correctly map variazione deceduti to chart', () => {
        component.mapVariazioneDecedutiToChart(mockedAndamentoNazionale);
        expect(component.variazioneDeceduti).toEqual(variazioneDeceduti);
        expect(component.chartData).toEqual([]);
    });

    it('Should correctly map variazione guariti to chart', () => {
        component.mapVariazioneGuaritiToChart(mockedAndamentoNazionale);
        expect(component.variazioneGuariti).toEqual(variazioneGuariti);
        expect(component.chartData).toEqual([]);
    });

    it('Should set chart data onTabChange()', () => {
        component.variazionePositivi = variazionePositivi;
        component.onTabChange(SelectedData.VARIAZIONE_POSITIVI);
        expect(component.chartData).toEqual(variazionePositivi);

        component.variazioneDeceduti = variazioneDeceduti;
        component.onTabChange(SelectedData.VARIAZIONE_DECEDUTI);
        expect(component.chartData).toEqual(variazioneDeceduti);

        component.variazioneGuariti = variazioneGuariti;
        component.onTabChange(SelectedData.VARIAZIONE_GUARITI);
        expect(component.chartData).toEqual(variazioneGuariti);
    });
});
