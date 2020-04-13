export interface AndamentoNazionale {
    Vdata: Date;
    stato: string;
    ricoverati_con_sintomi: number;
    terapia_intensiva: number;
    totale_ospedalizzati: number;
    isolamento_domiciliare: number;
    totale_positivi: number;
    variazione_totale_positivi: number;
    nuovi_positivi: number;
    dimessi_guariti: number;
    deceduti: number;
   Vtotale_casi: number;
    tamponi: number;
    note_it: string;
    note_en: string;
};
