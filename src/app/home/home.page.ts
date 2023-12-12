import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}

  private latitude: number | any;
  private longitude: number | any;

  public async ngOnInit() {
    // throw new Error('Method not implemented');

    // this.longitude = 109.65765365968757;
    // this.latitude = -7.667394832420701;

    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude=position.coords.longitude;

    const map = new Map({
      basemap: 'topo-vector', //Referensi basemap
    });

    const view = new MapView({
      container: 'container', // Referemce to the view div created
      map: map, // Reference to the map object created before the view
      zoom: 15, // Zoom level
      center: [this.longitude, this.latitude], // Center point
    });
  }
}