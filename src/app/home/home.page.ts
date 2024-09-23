import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mapView: MapView | any;
  userLocationGraphic : Graphic | any;

  constructor () {}

  async ngOnInit() {
    const map = new Map({
      basemap: "satellite"
      //streets, satellite
    });

    this.mapView = new MapView({
      container: "container",
      map: map,
      zoom: 8
    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    map.add(weatherServiceFL);

    await this.updateUserLocationOnMap();
    this.mapView.center = this.userLocationGraphic.geometry as Point;
    setInterval(this.updateUserLocationOnMap.bind(this), 10000);
  }
  async getLocationService(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve([resp.coords.latitude, resp.coords.longitude]);
      });
    });
  }

  async updateUserLocationOnMap() {
    let latLng = await this.getLocationService();
    let geom = new Point({ latitude: latLng[0], longitude: latLng[1] });
    if (this.userLocationGraphic) {
      this.userLocationGraphic.geometry = geom;
    } else {
      this.userLocationGraphic = new Graphic({
          symbol: new SimpleMarkerSymbol(),
          geometry: geom,
      });
      this.mapView.graphics.add(this.userLocationGraphic);
    }
  }
}

const WeatherServiceUrl =
  'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer'
// export class HomePage implements OnInit {
//   private latitude: number | any;   // Inisialisasi dengan nilai default
//   private longitude: number | any;  // Inisialisasi dengan nilai default

  // constructor() {}

  // public async ngOnInit() {
  //   //Mengambil posisi sekarang
  //   const position = await Geolocation.getCurrentPosition();
  //   this.latitude = position.coords.latitude;
  //   this.longitude = position.coords.longitude;

  //   // Inisialisasi dengan nilai default lokasi
  //   //this.longitude = 110.4180629249957;
  //   //this.latitude = -7.750050553283638;

  //   const map = new Map({
  //     basemap: 'topo-vector',
  //   });

  //   const view = new MapView({
  //     container: 'container',
  //     map: map,
  //     zoom: 14,
  //     center: [this.longitude, this.latitude],
  //   });
  //     // Gunakan class Point dari ArcGIS API
  //     const point = new Point({
  //       longitude: this.longitude,
  //       latitude: this.latitude
  //     });

  //     const markerSymbol = {
  //       type: "simple-marker",
  //       color: [226, 119, 40], // Oranye
  //       outline: {
  //         color: [255, 255, 255], // Putih
  //         width: 2
  //       }
  //     };

  //     const pointGraphic = new Graphic({
  //       geometry: point,  // Menggunakan class Point sebagai geometri
  //       symbol: markerSymbol
  //     });

  //     // Tambahkan marker ke peta
  //     view.graphics.add(pointGraphic);
  //   }
  // }