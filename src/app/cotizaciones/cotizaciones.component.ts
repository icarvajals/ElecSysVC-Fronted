import { Component } from '@angular/core';
import { HeaderUsuarrioComponent } from "../header-usuarrio/header-usuarrio.component";
import { MenuVerticalComponent } from "../menu-vertical/menu-vertical.component";
import { CotListarComponent } from "./cot-listar/cot-listar.component";

@Component({
  selector: 'app-cotizaciones',
  imports: [HeaderUsuarrioComponent, MenuVerticalComponent, CotListarComponent],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent {

}
