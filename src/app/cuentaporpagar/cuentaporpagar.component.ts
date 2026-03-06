import { Component } from '@angular/core';
import { HeaderUsuarrioComponent } from "../header-usuarrio/header-usuarrio.component";
import { MenuVerticalComponent } from "../menu-vertical/menu-vertical.component";
import { CuentaServiceService } from './Cuentas-Entidad/cuenta-service.service';
import { EntidadCuentasPagar } from './Cuentas-Entidad/CuentaPagar-Entidad';
import { ServiceClienteService } from '../cliente/service-cliente.service';
import { Router } from '@angular/router';
import { EntidadCliente } from '../cliente/entidad-cliente';
import { CommonModule, NgClass } from "@angular/common";

@Component({
  selector: 'app-cuentaporpagar',
  imports: [HeaderUsuarrioComponent, MenuVerticalComponent, NgClass, CommonModule],
  templateUrl: './cuentaporpagar.component.html',
  styleUrl: './cuentaporpagar.component.css'
})
export class CuentaporpagarComponent {

  constructor(private cuentaService: CuentaServiceService,
    private clienteService: ServiceClienteService,
    private route: Router) { }

  cuentasporpagar: EntidadCuentasPagar[] = [];
  clientes: EntidadCliente[] = [];

  clientesMap = new Map<number, EntidadCliente>();

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerCuentas();
  }

  obtenerClientes(): void {
    this.clienteService.listarClientes().subscribe(
      {
        next: (datos) => {
          this.clientes = datos;

          datos.forEach(cliente => {
            this.clientesMap.set(cliente.id_cliente, cliente);
          });
        },
        error: (error) => {
          console.error("Error al obtener la informacion de clientes", error);
        }
      }
    );
  }

  obtenerCuentas(): void {
    this.cuentaService.listarCuentasPorPagar().subscribe(
      {
        next: (datos) => {
          this.cuentasporpagar = datos;
          this.cuentasFiltradas = datos;
          this.calcularTotales();
        },
        error: (err) => {
          console.error("Error al obtener la informacion", err);
        }
      }
    );
  }

  evaluarEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'badge pendiente';
      case 'PAGADO':
        return 'badge completado';
      case 'EN_PROCESO':
        return 'badge cancelado';
      default:
        return 'badge';
    }
  }

  //Seccion de calculo de totales
  cuentasFiltradas: EntidadCuentasPagar[] = [];
  cantidadTodas: number = 0;
  cantidadPendiente: number = 0;
  cantidadPagado: number = 0;


  totalCuentas: number = 0;
  totalPendiente: number = 0;
  totalPagado: number = 0;

  calcularTotales(): void {

    this.totalCuentas = 0;
    this.totalPendiente = 0;
    this.totalPagado = 0;

    this.cantidadTodas = this.cuentasporpagar.length;
    this.cantidadPendiente = 0;
    this.cantidadPagado = 0;

    this.cuentasporpagar.forEach(cuenta => {

      this.totalCuentas += cuenta.monto;

      if (cuenta.estado === 'PENDIENTE') {
        this.totalPendiente += cuenta.monto;
        this.cantidadPendiente++;
      }

      if (cuenta.estado === 'PAGADO') {
        this.totalPagado += cuenta.monto;
        this.cantidadPagado++;
      }

    });

  }

  //Seccion de filtro de informacion por categoria

  filtroActivo: string = 'TODAS;'

  filtrarEstado(estado: string): void {

    this.filtroActivo = estado;

    if (estado === 'TODAS') {
      this.cuentasFiltradas = this.cuentasporpagar;
      return;
    }

    this.cuentasFiltradas = this.cuentasporpagar.filter(
      cuenta => cuenta.estado === estado
    );
  }

  navegarCrearCuenta(){
    this.route.navigate(['cuentaspagar/crear']);
  }

  verCuentaPagar(id: number){
    this.route.navigate(['cuentaspagar/ver', id]);
  }
}
