
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component, NgModule } from '@angular/core';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CrearCotComponent } from './cotizaciones/crear-cot/crear-cot.component';
import { VerCotizacionComponent } from './cotizaciones/ver-cotizacion/ver-cotizacion.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { LugarComponent } from './lugar/lugar.component';
import { CuentaporpagarComponent } from './cuentaporpagar/cuentaporpagar.component';
import { CrearCuentaComponent } from './cuentaporpagar/crear-cuenta/crear-cuenta.component';
import { VerCuentaComponent } from './cuentaporpagar/ver-cuenta/ver-cuenta.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'Menu', component: MenuPrincipalComponent},
    {path: 'cotizaciones', component: CotizacionesComponent},
    {path: 'cotizaciones/crear', component: CrearCotComponent},
    {path: 'cotizaciones/ver/:id', component: VerCotizacionComponent},

    {path: 'clientes', component: ClienteComponent},
    {path: 'clientes/crear', component: CrearClienteComponent},


    {path: 'lugares', component: LugarComponent},

    {path: 'cuentaspagar', component: CuentaporpagarComponent},
    {path: 'cuentaspagar/crear', component: CrearCuentaComponent},
    {path: 'cuentaspagar/ver/:id', component: VerCuentaComponent}, 
];

@NgModule(
    {
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
    }
)

export class AppRoutingModule {}
