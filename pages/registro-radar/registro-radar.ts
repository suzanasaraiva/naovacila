import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { RadarProvider } from '../../providers/radar/radar';
import { MeusRadaresPage } from '../meus-radares/meus-radares';
import { Storage } from '@ionic/storage';

declare var google;
@IonicPage()
@Component({
  selector: 'page-registro-radar',
  templateUrl: 'registro-radar.html',
})
export class RegistroRadarPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  endereco: any;
  latitude: any;
  longitude: any;
  id_usuario: any;
  token: any;
  raio: any;
  titulo: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public radarServico: RadarProvider, public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public storage: Storage) {
  }

  salvarRadar() {
    this.storage.get('user')
      .then(data => {
        console.log('usuário local: ' + JSON.stringify(data));
        this.user = JSON.parse(data);

        this.storage.get('token')
          .then(token => {
            console.log('INFO registro radar token ' + token);
            this.radarServico.salvarRadar(this.user.id, this.latitude, this.raio, this.longitude, this.endereco, this.titulo, token)
              .subscribe(
              data => {
                console.log("INFO - sucesso ao salvar radar " + JSON.stringify(data));
                this.navCtrl.pop();
              },
              err => {
                alert("Erro ao salvar radar. Tente novamente.")
                console.log('[ERRO] ao carregar radar no serviço' + err);
              },
              () => console.log("serviço finalizado")
              );
          })

      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroRadarPage');
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

      google.maps.event.addListener(marker, 'dragend', (event) => {
        console.log("marcador arrastado" + marker.getPosition().lat() + "- " + marker.position);
        this.reverseGeocode(marker.getPosition().lat(), marker.getPosition().lng());
      });

      this.reverseGeocode(position.coords.latitude, position.coords.longitude);

    }, (err) => {
      console.log(err);
    });
  }

  reverseGeocode(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude)
      .then((result: NativeGeocoderReverseResult) => {
        console.log('The address is ' + result.thoroughfare + ' in ' + result.countryCode + " " + JSON.stringify(result));
        this.endereco = result.thoroughfare + ", " + result.postalCode + " - " + result.locality;

        this.latitude = latitude;
        this.longitude = longitude;

      })
      .catch((error: any) => console.log("erro no geocoder reverso" + JSON.stringify(error)));

  }

}
