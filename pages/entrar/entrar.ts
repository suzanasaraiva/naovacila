import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { Http, RequestOptions, Headers } from '@angular/http';

let apiSalvarUsuarioUrl = "https://webserver-nao-vacila.herokuapp.com/usuario/";

@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class Entrar {
  user = {};
  registerForm: FormGroup;
  error: any;

  constructor(public navCtrl: NavController, 
    // public storage: NativeStorage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public http: Http) {

    this.registerForm = formBuilder.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.compose([Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  entrar() {
    var email = this.registerForm.controls.Email.value;
    var password = this.registerForm.controls.Password.value;

    let usuario = JSON.stringify({
      email: email,
      password: password
    })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(apiSalvarUsuarioUrl, usuario, options)
      .map(res=>res.json()).subscribe(
        data => {
          console.log(data);
          if (data != "WRONG PASSWORD" && data != "NOT FOUND!") {
            this.navCtrl.push(TabsPage);
          } else {
            this.error = true;
          }
        });
    
  }

}
