import { TestBed, getTestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { AndamentoNazionale } from './widgets/models/andamento-nazionale';
import { ReplaySubject } from 'rxjs';

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

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should correctly fetch latest andamentoNazionale data', () => {
    service.getAndamentoNazionaleLatest().subscribe(andamentoNazionale => {
      expect(andamentoNazionale).toEqual(mockedAndamentoNazionale[0])
    });

    const req = httpMock.expectOne(`/dpc-covid19-ita-andamento-nazionale-latest.json`);
    expect(req.request.method).toBe("GET");
    req.flush(mockedAndamentoNazionale);

    httpMock.verify();
  });

  it('Should correctly cache andamentoNazionale data', () => {
    const cachedAndamentoNazionale = service.getAndamentoNazionale(false);
    expect(cachedAndamentoNazionale).toEqual(jasmine.any(ReplaySubject));

    const req = httpMock.expectOne(`/dpc-covid19-ita-andamento-nazionale.json`);
    expect(req.request.method).toBe("GET");
    req.flush(mockedAndamentoNazionale);

    service['cachedAndamentoNazionale$'].subscribe();
    httpMock.verify();
  });

  it('Should correctly get cached andamentoNazionale data', () => {
    service['cachedAndamentoNazionale$'].next([...mockedAndamentoNazionale]);
    mockedAndamentoNazionale.pop();
    service.getAndamentoNazionale(false).subscribe(andamentoNazionale => {
      expect(mockedAndamentoNazionale).not.toEqual(andamentoNazionale);
    });
  });

  it('Should re-fetch andamentoNazionale data with forceRefresh flag', () => {
    const cachedAndamentoNazionale = service.getAndamentoNazionale(false);
    expect(cachedAndamentoNazionale).toEqual(jasmine.any(ReplaySubject));

    const req = httpMock.expectOne(`/dpc-covid19-ita-andamento-nazionale.json`);
    expect(req.request.method).toBe("GET");
    req.flush(mockedAndamentoNazionale);

    service['cachedAndamentoNazionale$'].subscribe();
    httpMock.verify();
  });
});
