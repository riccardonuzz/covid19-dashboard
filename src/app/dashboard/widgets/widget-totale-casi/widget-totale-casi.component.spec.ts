import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTotaleCasiComponent } from './widget-totale-casi.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../data.service';
import { of } from 'rxjs';
import { AndamentoNazionale } from '../models/andamento-nazionale';
import { CardComponent } from '../card/card.component';

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

class MockedDataService {
    getAndamentoNazionale() {
        return of(mockedAndamentoNazionale)
    }
}

describe('WidgetTotaleCasiComponent', () => {
    let component: WidgetTotaleCasiComponent;
    let fixture: ComponentFixture<WidgetTotaleCasiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CardComponent, WidgetTotaleCasiComponent],
            providers: [{
                provide: DataService, useClass: MockedDataService
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetTotaleCasiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should set data on init', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.andamentoNazionale).toBe(mockedAndamentoNazionale[1]);
    });
});
