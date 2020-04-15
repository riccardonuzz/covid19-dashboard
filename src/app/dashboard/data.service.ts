import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { AndamentoNazionale } from './widgets/models/andamento-nazionale';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cachedAndamentoNazionale$: ReplaySubject<AndamentoNazionale[]> = new ReplaySubject(1);

  constructor(private httpClient: HttpClient) { }

  public getAndamentoNazionaleLatest(): Observable<AndamentoNazionale> {
    return this.httpClient.get<AndamentoNazionale>('dpc-covid19-ita-andamento-nazionale-latest.json')
      .pipe(
        map(andamentoNazionale => andamentoNazionale[0])
      );
  }

  public getAndamentoNazionale(forceRefresh?: boolean): Observable<AndamentoNazionale[]> {
    if (!this.cachedAndamentoNazionale$.observers.length || forceRefresh) {
      this.httpClient.get<AndamentoNazionale[]>('dpc-covid19-ita-andamento-nazionale.json').subscribe(
        data => this.cachedAndamentoNazionale$.next(data),
        error => {
          this.cachedAndamentoNazionale$.error(error);
          // Recreate the Observable as after Error we cannot emit data anymore
          this.cachedAndamentoNazionale$ = new ReplaySubject(1);
        }
      );
    }
    return this.cachedAndamentoNazionale$;
  }
}
