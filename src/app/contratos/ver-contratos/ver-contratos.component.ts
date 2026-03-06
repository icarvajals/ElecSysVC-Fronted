import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ver-contratos',
  imports: [CommonModule],
  templateUrl: './ver-contratos.component.html',
  styleUrl: './ver-contratos.component.css'
})
export class VerContratosComponent {

  @Input() contrato: any;

  @Input() mostrar: boolean = false;

  @Output() cerrarModal = new EventEmitter<void>();

  cerrar(){
    this.cerrarModal.emit();
  }

}
