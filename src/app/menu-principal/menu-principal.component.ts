import { Component } from '@angular/core';
import { FooterUsuarioComponent } from "../footer-usuario/footer-usuario.component";
import { HeaderUsuarrioComponent } from "../header-usuarrio/header-usuarrio.component";
import { Router } from '@angular/router';
import { ModalContratoService } from '../contratos/ContratosClases/modal-contrato.service';

@Component({
  selector: 'app-menu-principal',
  imports: [FooterUsuarioComponent, HeaderUsuarrioComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

  constructor(private router:Router, private flotanteServiceContrato: ModalContratoService){}

  GestionCotizaciones(){
    this.router.navigate(['cotizaciones'])
  }

  CrearCotizacion(){
    this.router.navigate(['cotizaciones/crear']);
  }

  GestionCuentasPagar(){
    this.router.navigate(['cuentaspagar']);
  }

  CrearCuenta(){
    this.router.navigate(['cuentaspagar/crear']);
  }

  GestionarContratos(){
    this.router.navigate(['contratos']);
  }

  CrearContrato(){
    this.router.navigate(['contratos']).then(() => {
      setTimeout(() => {
        this.flotanteServiceContrato.abrirFlotante();
      }, 100);
    });
  }
}
