import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AndamentoNazionale } from './widgets/models/andamento-nazionale';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getAndamentoNazionaleLatest(): Observable<AndamentoNazionale> {
    return this.httpClient.get('dpc-covid19-ita-andamento-nazionale-latest.json')
      .pipe(
        map(andamentoNazionale => andamentoNazionale[0])
      );
  }
}
