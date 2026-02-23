import { Component } from '@angular/core';
import { HeaderUsuarrioComponent } from "../../header-usuarrio/header-usuarrio.component";
import { MenuVerticalComponent } from "../../menu-vertical/menu-vertical.component";
import { CuentaServiceService } from '../Cuentas-Entidad/cuenta-service.service';
import { ServiceClienteService } from '../../cliente/service-cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadCuentasPagar } from '../Cuentas-Entidad/CuentaPagar-Entidad';
import { EntidadCliente } from '../../cliente/entidad-cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetalleCuentaForm, DetalleCuentaUI } from '../Cuentas-Entidad/request-cuentadecobro';
import { EntidadDetalleCuenta } from '../Cuentas-Entidad/DetalleCuentaEntidad';

@Component({
  selector: 'app-ver-cuenta',
  imports: [HeaderUsuarrioComponent, MenuVerticalComponent, FormsModule, CommonModule],
  templateUrl: './ver-cuenta.component.html',
  styleUrl: './ver-cuenta.component.css'
})
export class VerCuentaComponent {

  constructor(private cuentaService: CuentaServiceService,
    private clienteService: ServiceClienteService,
    private ruta: ActivatedRoute, private route: Router) { }

  cuentapagar!: EntidadCuentasPagar;
  cliente!: EntidadCliente;
  idCuentaPorPagar!: number;
  cuentaporpagarEditable!: EntidadCuentasPagar;
  detalleCuenta: EntidadDetalleCuenta[] = [];

  ngOnInit() {
    this.idCuentaPorPagar = this.ruta.snapshot.params['id'];

    this.cuentaService.obtenerCuentaPagarID(this.idCuentaPorPagar)
      .subscribe(cuenta => {
        this.cuentapagar = cuenta;
        this.recargarDetallesCuenta();
        this.cuentaporpagarEditable = structuredClone(cuenta);
        this.idClienteOriginal = cuenta.id_cliente;

        this.clienteService.buscarClientePorId(cuenta.id_cliente)
          .subscribe(client => { this.cliente = client });
      })
  }

  editCliente = false;
  textoBusquedaCliente = '';
  clientes: EntidadCliente[] = [];
  clienteSeleccionado?: EntidadCliente;
  idClienteOriginal!: number;

  editarCliente() {
    this.editCliente = true;
  }

  buscarClientes(): void {
    if (this.textoBusquedaCliente.length < 2) {
      this.clientes = [];
      return;
    }

    this.clienteService.buscarClienteQuery(this.textoBusquedaCliente).subscribe({
      next: (resultados) => {
        this.clientes = resultados;
      },
      error: () => {
        this.clientes = [];
      }
    })
  }

  seleccionarCliente(cliente: EntidadCliente) {
    this.clienteSeleccionado = cliente;

    this.cuentaporpagarEditable.id_cliente = this.clienteSeleccionado.id_cliente;
    this.cliente = this.clienteSeleccionado;
    this.idClienteOriginal = this.cliente.id_cliente;

    this.editCliente = false;
    this.textoBusquedaCliente = '';
  }

  clienteCambio(): boolean {
    return !!this.clienteSeleccionado &&
      this.clienteSeleccionado.id_cliente !== this.idClienteOriginal;
  }

  navegarCrearCliente() {
    this.route.navigate(['clientes/crear']);
  }

  editDetalle = false;
  editDetalleCuenta: DetalleCuentaUI[] = [];

  recargarDetallesCuenta() {
    if (!this.idCuentaPorPagar) return;

    this.cuentaService.
      obtenerDetalleCuentaPorId(this.idCuentaPorPagar).subscribe(detalle => {
        this.detalleCuenta = detalle;

        this.editDetalleCuenta = detalle.map(d => ({
          ...d, editando: false, esNuevo: false
        }));
      });
  }

  editarFila(det: DetalleCuentaUI) {
    det.editando = true;
  }

  agregarFila() {
    this.editDetalleCuenta.push({
      id_detalle_cuenta: 0,
      descripcion: '',
      valor: 0,
      editando: true,
      esNuevo: true
    });
  }

  guardarFila(det: DetalleCuentaUI) {
    const dto: EntidadDetalleCuenta = {
      id_detalle_cuenta: det.id_detalle_cuenta,
      id_cuenta_pagar: this.idCuentaPorPagar,
      descripcion: det.descripcion,
      valor: det.valor
    };

    if (det.esNuevo) {
      this.cuentaService.crearDetalleCuenta(this.idCuentaPorPagar, dto).subscribe(() => {
        alert('Detalle Creado Exitosamente');
        this.recargarDetallesCuenta();
      });
    } else {
      this.cuentaService.actualizarDetalleCuenta(this.idCuentaPorPagar, det.id_detalle_cuenta, dto)
        .subscribe(() => {
          det.editando = false;
          alert('Detalle Actualizado');
          this.recargarDetallesCuenta();
        })
    }
  }

  eliminarFila(det: DetalleCuentaUI, index: number) {
    if (det.esNuevo) {
      this.editDetalleCuenta.splice(index, 1);
      return;
    }

    this.cuentaService.borrarDetalleCotizacion(this.idCuentaPorPagar, det.id_detalle_cuenta)
      .subscribe(() => {
        alert('Detalle Eliminado');
        this.recargarDetallesCuenta();
      });
  }

  cancelarFila(det: DetalleCuentaUI, index: number) {
    if (det.esNuevo) {
      this.editDetalleCuenta.splice(index, 1);
    } else {
      det.editando = false;
      this.recargarDetallesCuenta();
    }
  }

  get valorApagar(): number {
    return this.editDetalleCuenta.filter(d => !d.editando)
      .reduce((acc, d) => acc + (d.valor || 0), 0);
  }

  private baseCuenta(): EntidadCuentasPagar {
    return {
      id_cuenta_pagar: this.cuentapagar.id_cuenta_pagar,
      id_trabajador: 1,
      id_cliente: this.cuentaporpagarEditable.id_cliente,
      referencia: this.cuentaporpagarEditable.referencia,
      nota: this.cuentaporpagarEditable.nota,
      fecha_realizacion: new Date().toISOString().split('T')[0],
      monto: this.valorApagar,
      estado: this.cuentaporpagarEditable.estado,
    };
  }

  actualizarCuenta(): void {
    const dto: EntidadCuentasPagar = this.baseCuenta();

    console.log('Dto Enviado: ', dto);
    this.cuentaService.actualizarCuentaPagar(this.idCuentaPorPagar, dto)
      .subscribe({
        next: () => {
          alert('Cuenta Actualizada Correctamente');
          this.cuentapagar = { ...this.cuentapagar, ...dto };
          this.route.navigate(['cuentaspagar']);
        },
        error: err => {
          console.error(err);
          alert('Error al Actualizar la cuenta');
        }
      });
  }



}
