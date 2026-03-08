import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-vertical',
  imports: [NgIf],
  templateUrl: './menu-vertical.component.html',
  styleUrl: './menu-vertical.component.css'
})
export class MenuVerticalComponent {

  constructor(private router:Router){}

cotizacionesOpen = false;
clientesOpen = false;
lugaresOpen = false;
cuentasporpagaropen = false;

toggleCotizaciones() {
  this.cotizacionesOpen = !this.cotizacionesOpen;
}

  Irinicio(){
    this.router.navigate(['Menu']);
  }

  GestionCotizaciones(){
    this.router.navigate(['\cotizaciones'])
  }

  CrearCotizacion(){
    this.router.navigate(['cotizaciones/crear']);
  }

  barraClientes(){
    this.clientesOpen = !this.clientesOpen;
  }

  GestionClientes(){
    this.router.navigate(['clientes']);
  }

  barraLugares(){
    this.lugaresOpen = !this.lugaresOpen;
  }

  GestionLugares(){
    this.router.navigate(['lugares']);
  }

  barraCuentasPagar(){
    this.cuentasporpagaropen = !this.cuentasporpagaropen;
  }

  GestionarCuentas(){
    this.router.navigate(['cuentaspagar']);
  }

  GestionarContratos(){
    this.router.navigate(['contratos']);
  }
}
