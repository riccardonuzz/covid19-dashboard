import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from '../../data.service';
import { WidgetCasiRegionaliComponent } from './widget-casi-regionali.component';

const mockedDatiRegionali = [
  {
    data: new Date("2020-12-18T17:00:00"),
    stato: "ITA",
    codice_regione: 13,
    denominazione_regione: "Abruzzo",
    lat:42.35122196,
    long: 13.39843823,
    ricoverati_con_sintomi: 559,
    terapia_intensiva: 42,
    totale_ospedalizzati: 601,
    isolamento_domiciliare: 12574,
    totale_positivi: 13175,
    variazione_totale_positivi: -250,
    nuovi_positivi: 227,
    dimessi_guariti: 18815,
    deceduti: 1111,
    casi_da_sospetto_diagnostico:null,
    casi_da_screening:null,
    totale_casi: 33101,
    tamponi:480066,
    casi_testati:259774,
    note: null,
    ingressi_terapia_intensiva: 3,
    note_test: null,
    note_casi: null
  },
  {
    data : new Date("2020-12-18T17:00:00"),
    stato : "ITA",
    codice_regione : 17,
    denominazione_regione : "Basilicata",
    lat : 40.63947052,
    long : 15.80514834,
    ricoverati_con_sintomi : 99,
    terapia_intensiva : 10,
    totale_ospedalizzati : 109,
    isolamento_domiciliare : 5928,
    totale_positivi : 6037,
    variazione_totale_positivi : -38,
    nuovi_positivi : 73,
    dimessi_guariti : 3635,
    deceduti : 218,
    casi_da_sospetto_diagnostico : null,
    casi_da_screening : null,
    totale_casi : 9890,
    tamponi : 172516,
    casi_testati : 112879,
    note : null,
    ingressi_terapia_intensiva : 1,
    note_test : "N.B. DATO PERSONE TESTATE RICALCOLATO E DERIVATO DA VERIFICA PIATTAFORMA COVID 19 REGIONE BASILICATA.",
    note_casi : null
  }
];

class MockedDataService {
  getDatiRegioniLatest() {
    return of(mockedDatiRegionali);
  }
}


describe('WidgetCasiRegionaliComponent', () => {
  let component: WidgetCasiRegionaliComponent;
  let fixture: ComponentFixture<WidgetCasiRegionaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetCasiRegionaliComponent],
      providers: [
        { provide: DataService, useClass: MockedDataService }
    ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCasiRegionaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
