import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

const TICKETS: Ticket[] = [
  {id: 46263,
  cliente: 'Gerardo Aguirre',
  fechaAper: '2017-09-01',
  fechaCierre: '2017-09-02',
  numNovedades: 3,
  estado: 'cerrado',
  descripcion: 'Falla carga de portal'},

  {id: 46264,
  cliente: 'Edgar Toledo',
  fechaAper: '2017-09-02',
  fechaCierre: '2017-09-02',
  numNovedades: 1,
  estado: 'cerrado',
  descripcion: 'Instalar la nueva version'},

  {id: 46265,
  cliente: 'Fernando Ruiz',
  fechaAper: '2017-09-03',
  fechaCierre: '2017-09-04',
  numNovedades: 4,
  estado: 'cerrado',
  descripcion: 'Activar nueva cuenta'},

  {id: 46266,
  cliente: 'Alfredo Puente',
  fechaAper: '2017-09-08',
  fechaCierre: '2017-09-12',
  numNovedades: 2,
  estado: 'pendiente',
  descripcion: 'No carga el portal'}
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;
  tickets =  TICKETS;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo Ticket',
      message: "Ingrese los datos del Ticket",
      inputs: [
        {name: 'titulo', placeholder: "Título"},
        {name: 'descripción', placeholder: "Descripción"},
        {name: 'prioridad', placeholder: "Prioridad"},
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

}

export class Ticket{
  id: number;
  cliente: string;
  fechaAper: string;
  fechaCierre: string;
  numNovedades: number;
  estado: string;
  descripcion: string;
}