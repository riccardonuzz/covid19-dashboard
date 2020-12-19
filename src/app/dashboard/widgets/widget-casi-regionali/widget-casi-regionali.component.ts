import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { DataService } from '../../data.service';
import * as Leaflet from 'leaflet';
import { DatiRegione } from '../models/dati-regione';
import { ThemeService } from 'src/app/theme/theme.service';
import { SupportedThemes, themes } from 'src/app/theme/themes';
import { SelectedData } from '../models/SelectedData';
import { Tab } from '../tab/tab';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import italyGeoJson from './../../../../assets/italy.json';


@Component({
  selector: 'app-widget-casi-regionali',
  templateUrl: './widget-casi-regionali.component.html',
  styleUrls: ['./widget-casi-regionali.component.scss']
})
export class WidgetCasiRegionaliComponent implements OnInit {
  static config: GridsterItem = {
    cols: 2,
    rows: 4,
    minItemCols: 2,
    minItemRows: 4,
    y: 1,
    x: 2,
    resizeEnabled: false,
    dragEnabled: false,
    type: 'WIDGET_CASI_REGIONALI'
  };

  private datiRegione: DatiRegione[];

  private map: Leaflet.Map;
  private tilesLayer: Leaflet.TileLayer;
  private markers: Leaflet.Marker[];
  private geoJson: any;

  private markerValueKey = 'totale_positivi';

  // Tabs options
  tabs: Tab[] = [{
    id: SelectedData.VARIAZIONE_POSITIVI,
    name: "Positivi"
  }, {
    id: SelectedData.VARIAZIONE_GUARITI,
    name: "Guariti"
  }, {
    id: SelectedData.VARIAZIONE_DECEDUTI,
    name: "Deceduti"
  }];

  constructor(private dataService: DataService, private themeService: ThemeService) { }

  ngOnInit() {
    const datiRegioneLatest = this.dataService.getDatiRegioniLatest();
    const activeTheme = this.themeService.getActiveTheme();
    combineLatest([datiRegioneLatest, activeTheme])
      .pipe(take(1))
      .subscribe(([datiRegione, activeTheme]) => {
        this.datiRegione = datiRegione;
        this.initMap();
        this.setGeoJson(activeTheme);
        this.replaceTilesLayer(activeTheme);
        this.setMarkers();
      });

    this.themeService.getActiveTheme().subscribe((activeTheme: SupportedThemes) => {
      this.replaceTilesLayer(activeTheme);
      this.setGeoJson(activeTheme);
    });
  }


  private initMap() {
    this.map = Leaflet.map('map', {
      center: [41.89193, 12.51133],
      zoom: 5.5
    });

    this.tilesLayer = Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    });

    this.tilesLayer.addTo(this.map);
  }

  private setGeoJson(activeTheme: SupportedThemes) {
    const polystyle = (feature) => {
      return {
        fillColor: 'transparent',
        weight: 2,
        opacity: 1,
        color: themes[activeTheme]['--theme-secondary-color'],
        fillOpacity: 0.7
      };
    };

    if (this.map) {
      if (this.geoJson)
        this.map.removeLayer(this.geoJson);
      this.geoJson = Leaflet.geoJSON(italyGeoJson as any, { style: polystyle });
      this.geoJson.addTo(this.map);
    }
  }

  private replaceTilesLayer(activeTheme: SupportedThemes) {
    if (this.map && this.tilesLayer) {
      this.map.removeLayer(this.tilesLayer);
      if (activeTheme === SupportedThemes.LIGHT_THEME) {
        this.tilesLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        });
      } else {
        this.tilesLayer = Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19
        });
      }
      this.tilesLayer.addTo(this.map);
    }
  }

  private setMarkers() {
    this.resetMarkers();
    this.markers = this.datiRegione.map(datiRegione => {
      const marker: Leaflet.Marker = Leaflet.marker([datiRegione.lat, datiRegione.long], { opacity: 0.01 });
      marker.bindTooltip(datiRegione[this.markerValueKey].toString(), { permanent: true, className: "my-label", offset: [0, 0] });
      marker.addTo(this.map);
      return marker;
    });
  }

  private resetMarkers() {
    if (this.markers) {
      this.markers.forEach((marker: Leaflet.Marker) => {
        this.map.removeLayer(marker);
      });
    }
  }

  onTabChange(event: SelectedData) {
    switch (event) {
      case SelectedData.VARIAZIONE_GUARITI:
        this.markerValueKey = 'dimessi_guariti';
        break;
      case SelectedData.VARIAZIONE_DECEDUTI:
        this.markerValueKey = 'deceduti';
        break;
      default:
        this.markerValueKey = 'totale_positivi';
        break;
    }

    this.setMarkers();
  }
}
