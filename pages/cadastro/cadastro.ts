import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';

let apiSalvarUsuarioUrl = "https://webserver-nao-vacila.herokuapp.com/usuario/";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class Cadastro {
  user = {};
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, 
    // public storage: NativeStorage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public usuarioServico: UsuarioProvider) {

    this.registerForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.compose([Validators.required])],
      ConfirmPassword: ['', Validators.compose([Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  registerUser() {
    // this.navCtrl.push(TabsPage);
    if (this.registerForm.controls.Password.value == this.registerForm.controls.ConfirmPassword.value) {
      console.log("Password match");
      console.log(this.registerForm.controls.Email.value);

      var token = "token123";
      var email =  this.registerForm.controls.Email.value;
      var name =  this.registerForm.controls.name.value;
      var password =  this.registerForm.controls.Password.value;

      this.usuarioServico.salvarUsuario(token, email, name, password).subscribe(
        data => {
          console.log("Data");
          console.log(data);
          console.log("finish data");
          this.navCtrl.push(LoginPage);
        },
        err => {
          console.log('Erro ao salvar usuario' + err);
        });
    }
    // if (this.registerForm.controls.Password.value == this.registerForm.controls.ConfirmPassword.value) {
    //   if (this.registerForm.valid) {
    //     console.log('INFO - form válido ' + JSON.stringify(this.user));
    //     this.accountService.registerUser(this.user)
    //       .subscribe(
    //       data => {
    //         console.log('INFO - registerUser > CadastroUsuarioPage ' + JSON.stringify(data));
    //         //retorna ok, redireciona para o endpoint token e salva accesToken e refreshToken
    //         this.accountService.login(this.user)
    //           .subscribe(
    //           data => {
    //             console.log('INFO - login > registerUser > CadastroUsuarioPage ' + JSON.stringify(data));
    //             //salva acces token e refresh token
    //             this.storage.setItem('access_token', data.access_token);
    //             this.storage.setItem('refresh_token', data.refresh_token);
    //             this.storage.setItem('username',data.userName)
    //             this.navCtrl.setRoot(HomePage);
    //           },
    //           err => {
    //             console.log('ERROR - login > registerUser > CadastroUsuarioPage ' + JSON.stringify(err));
    //           }
    //           )
    //       },
    //       err => {
    //         console.log('ERROR - registerUser > CadastroUsuarioPage ' + JSON.stringify(err));
    //       }
    //       )
    //   } else {
    //     let alert = this.alertCtrl.create({
    //       title: 'Inválido',
    //       subTitle: 'Por favor preencha todos os campos obrigatórios.',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   }
    // }else{
    //   let alert = this.alertCtrl.create({
    //       title: 'Senhas não são iguais',
    //       subTitle: 'O campo de confirmar senha não está igual.',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    // }

    
  }

}
