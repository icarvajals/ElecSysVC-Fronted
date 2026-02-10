import { Component } from '@angular/core';
import { FooterUsuarioComponent } from "../footer-usuario/footer-usuario.component";
import { HeaderUsuarrioComponent } from "../header-usuarrio/header-usuarrio.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  imports: [FooterUsuarioComponent, HeaderUsuarrioComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

  constructor(private router:Router){}

  GestionCotizaciones(){
    this.router.navigate(['\cotizaciones'])
  }

  CrearCotizacion(){
    this.router.navigate(['cotizaciones/crear']);
  }

}
