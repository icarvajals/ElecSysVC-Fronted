import { Component } from '@angular/core';
import { HeaderUsuarrioComponent } from "../header-usuarrio/header-usuarrio.component";
import { MenuVerticalComponent } from "../menu-vertical/menu-vertical.component";
import { ContratoServiceService } from './ContratosClases/contrato-service.service';
import { Router } from '@angular/router';
import { ContratoEntidad, TrabajadorEntidad } from './ContratosClases/contrato-entidad';
import { CommonModule } from '@angular/common';
import { requestContrato } from './ContratosClases/contrato-request';
import { FormsModule } from '@angular/forms';
import { ModalContratoService } from './ContratosClases/modal-contrato.service';
import { VerContratosComponent } from "./ver-contratos/ver-contratos.component";

@Component({
  selector: 'app-contratos',
  imports: [HeaderUsuarrioComponent, MenuVerticalComponent, CommonModule, FormsModule, VerContratosComponent],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})

export class ContratosComponent {

  constructor(private contratoService: ContratoServiceService,
    private route: Router, private ModalFlotanteService: ModalContratoService) { }

  contratos: ContratoEntidad[] = [];
  trabajadores: TrabajadorEntidad[] = [];

  trabajadorMap = new Map<number, TrabajadorEntidad>();

  ngOnInit() {
    this.obtenerContratos();
    this.obtenerTrabajadores();
    this.abrirFlotanteContrato();
  }


  obtenerContratos(): void {
    this.contratoService.listarContratos().subscribe(
      {
        next: (datos) => {
          console.log('CONTRATOS BACK:', datos);
          this.contratos = datos;
        },
        error: (err) => {
          console.error("Error al obtener la informacion", err);
        }
      }
    );
  }

  obtenerTrabajadores(): void {
    this.contratoService.listarTrabajadores().subscribe(
      {
        next: (datos) => {
          this.trabajadores = datos;

          datos.forEach(trabajador => {
            this.trabajadorMap.set(trabajador.id_trabajador, trabajador);
          });
        },
        error: (error) => {
          console.error("Error al obtener la informacion de trabajador");
        }
      }
    )
  }

  evaluarEstado(estado: string): string {
    switch (estado) {
      case 'ACTIVO':
        return 'badge completado';
      case 'VENCIDO':
        return 'badge pendiente';
      default:
        return 'badge';
    }
  }


  //===================== Crear Contrato ===========================
  mostrarFlotanteContrato = false;

nuevoContrato: requestContrato = {
  contrato: {
    id_contrato: 1,
    id_trabajador: 0,
    sueldo: 0,
    fecha_expedicion: null,
    fecha_iniciacion: null,
    id_trabajador_encargado: 1031802567,
    cargo: '',
    tipo_contrato: '',
    estado: 'ACTIVO'
  },
  fecha_nacimiento: null,
  lugar_nacimiento: '',
  edad: 0,
  estadoCivil: ''
};

  abrirFlotanteContrato() {
    this.mostrarFlotanteContrato = true;
  }

  cerrarFlotanteContrato() {
    this.mostrarFlotanteContrato = false;
  }

  guardarContrato(): void {
    if (!this.nuevoContrato.contrato.id_trabajador) {
      alert("Debe seleccionar un trabajador");
      return;
    }

    if (!this.nuevoContrato.contrato.cargo) {
      alert("Debe ingresar el cargo");
      return;
    }

    if (!this.nuevoContrato.contrato.sueldo) {
      alert("Debe ingresar el sueldo");
      return;
    }

    if (!this.nuevoContrato.contrato.fecha_expedicion) {
      alert("Debe ingresar fecha de expedición");
      return;
    }

    if(!this.nuevoContrato.estadoCivil){
      alert('Debes ingresar un estado Civil')
    }

    this.contratoService.crearContrato(this.nuevoContrato).subscribe({
      next: (pdf) => {
        const url = window.URL.createObjectURL(pdf);
        this.obtenerContratos();
        this.cerrarFlotanteContrato();
        window.open(url);
      },
      error: err =>
        console.error('Error al guardar el contrato', err)
    });
  }


  formatearSueldo(valor: number): string {
    if (!valor) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  }

  actualizarSueldo(event: any) {
    let valor = event.target.value.replace(/[^0-9]/g, '');
    this.nuevoContrato.contrato.sueldo = Number(valor);
  }

  crearTrabajador() {

  }

  abrirMenuFlotante(){
    this.ModalFlotanteService.abrirFlotante$.subscribe(() => {
      this.abrirFlotanteContrato();
    });
  }


  // ============== Ver Contrato ==================0
   contratoSeleccionado: any = null;

   mostrarVerContrato = false;

  verContrato(id: number){

    this.contratoSeleccionado= null;

    this.contratoService.buscarContratoPorID(id).subscribe({
      next: (data) => {
        this.contratoSeleccionado = data;
        this.mostrarVerContrato = true;
      },
      error: err => console.error(err)
    });
  }
}
