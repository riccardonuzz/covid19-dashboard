import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetBulletinListComponent } from './widget-bulletin-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardComponent } from '../card/card.component';
import { DataService } from '../../data.service';
import { of } from 'rxjs';

const initialMockedAndamentoNazionale = [
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
  },
  {
    data: new Date("2020-02-26T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 128,
    terapia_intensiva: 36,
    totale_ospedalizzati: 164,
    isolamento_domiciliare: 221,
    totale_positivi: 385,
    variazione_totale_positivi: 74,
    nuovi_positivi: 78,
    dimessi_guariti: 3,
    deceduti: 12,
    totale_casi: 400,
    tamponi: 9587,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-02-27T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 248,
    terapia_intensiva: 56,
    totale_ospedalizzati: 304,
    isolamento_domiciliare: 284,
    totale_positivi: 588,
    variazione_totale_positivi: 203,
    nuovi_positivi: 250,
    dimessi_guariti: 45,
    deceduti: 17,
    totale_casi: 650,
    tamponi: 12014,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-02-28T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 345,
    terapia_intensiva: 64,
    totale_ospedalizzati: 409,
    isolamento_domiciliare: 412,
    totale_positivi: 821,
    variazione_totale_positivi: 233,
    nuovi_positivi: 238,
    dimessi_guariti: 46,
    deceduti: 21,
    totale_casi: 888,
    tamponi: 15695,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-02-29T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 401,
    terapia_intensiva: 105,
    totale_ospedalizzati: 506,
    isolamento_domiciliare: 543,
    totale_positivi: 1049,
    variazione_totale_positivi: 228,
    nuovi_positivi: 240,
    dimessi_guariti: 50,
    deceduti: 29,
    totale_casi: 1128,
    tamponi: 18661,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-03-01T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 639,
    terapia_intensiva: 140,
    totale_ospedalizzati: 779,
    isolamento_domiciliare: 798,
    totale_positivi: 1577,
    variazione_totale_positivi: 528,
    nuovi_positivi: 566,
    dimessi_guariti: 83,
    deceduti: 34,
    totale_casi: 1694,
    tamponi: 21127,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-03-02T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 742,
    terapia_intensiva: 166,
    totale_ospedalizzati: 908,
    isolamento_domiciliare: 927,
    totale_positivi: 1835,
    variazione_totale_positivi: 258,
    nuovi_positivi: 342,
    dimessi_guariti: 149,
    deceduti: 52,
    totale_casi: 2036,
    tamponi: 23345,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-03-03T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 1034,
    terapia_intensiva: 229,
    totale_ospedalizzati: 1263,
    isolamento_domiciliare: 1000,
    totale_positivi: 2263,
    variazione_totale_positivi: 428,
    nuovi_positivi: 466,
    dimessi_guariti: 160,
    deceduti: 79,
    totale_casi: 2502,
    tamponi: 25856,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-03-04T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 1346,
    terapia_intensiva: 295,
    totale_ospedalizzati: 1641,
    isolamento_domiciliare: 1065,
    totale_positivi: 2706,
    variazione_totale_positivi: 443,
    nuovi_positivi: 587,
    dimessi_guariti: 276,
    deceduti: 107,
    totale_casi: 3089,
    tamponi: 29837,
    note_it: "",
    note_en: ""
  },
  {
    data: new Date("2020-03-05T18:00:00"),
    stato: "ITA",
    ricoverati_con_sintomi: 1790,
    terapia_intensiva: 351,
    totale_ospedalizzati: 2141,
    isolamento_domiciliare: 1155,
    totale_positivi: 3296,
    variazione_totale_positivi: 590,
    nuovi_positivi: 769,
    dimessi_guariti: 414,
    deceduti: 148,
    totale_casi: 3858,
    tamponi: 32362,
    note_it: "",
    note_en: ""
  }
];

let mockedAndamentoNazionale = [...initialMockedAndamentoNazionale];

class MockedDataService {
  getAndamentoNazionale() {
    return of(mockedAndamentoNazionale);
  }
}


describe('WidgetBulletinListComponent', () => {
  let component: WidgetBulletinListComponent;
  let fixture: ComponentFixture<WidgetBulletinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [CardComponent, WidgetBulletinListComponent],
      providers: [
        { provide: DataService, useClass: MockedDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockedAndamentoNazionale = initialMockedAndamentoNazionale;
    fixture = TestBed.createComponent(WidgetBulletinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get latest 10 bulletins', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const latest10Elements = mockedAndamentoNazionale.slice(Math.max(mockedAndamentoNazionale.length - 10, 0));
    expect(component.bulletins).toEqual(latest10Elements.reverse());
  });

  it('Should get latest n if less than 10', () => {
    mockedAndamentoNazionale = mockedAndamentoNazionale.slice(Math.max(mockedAndamentoNazionale.length - 5, 0));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.bulletins.length).toBe(5);
    expect(component.bulletins).toEqual(mockedAndamentoNazionale.reverse());
  });

  it('Should render latest 10 bulletins', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ul')).toBeTruthy();

    // list header is included
    expect(compiled.querySelectorAll('li').length).toBe(11);
  });

  it('Should render latest n if less than 10', () => {
    mockedAndamentoNazionale = mockedAndamentoNazionale.slice(Math.max(mockedAndamentoNazionale.length - 5, 0));
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ul')).toBeTruthy();

    // list header is included
    expect(compiled.querySelectorAll('li').length).toBe(6);
  });
});
