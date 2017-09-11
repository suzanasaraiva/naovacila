import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


let apiSalvarUsuarioUrl = "https://webserver-nao-vacila.herokuapp.com/usuario/";
@Injectable()
export class UsuarioProvider {

  constructor(public http: Http) {
    console.log('Hello UsuarioProvider Provider');
  }

  salvarUsuarioFB(token, email, sexo, nome, url_foto, id_fb){
    let usuario = JSON.stringify({
      token: token,
      email: email,
      sexo: sexo,
      nome: nome,
      url_foto: url_foto,
      id_fb: id_fb
    })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this.http.post(apiSalvarUsuarioUrl, usuario, options)
      .map(res=>res.json());


  }

  salvarUsuario(token, email, nome, password){
    console.log("Nome do cara legal: " + nome);

    let usuario = JSON.stringify({
      token: token,
      email: email,
      sexo: null,
      nome: nome,
      url_foto: null,
      password: password
    })
    console.log(usuario);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this.http.post(apiSalvarUsuarioUrl, usuario, options)
      .map(res=>res.json());


  }

}
