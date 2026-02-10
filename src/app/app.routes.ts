
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CrearCotComponent } from './cotizaciones/crear-cot/crear-cot.component';
import { VerCotizacionComponent } from './cotizaciones/ver-cotizacion/ver-cotizacion.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { LugarComponent } from './lugar/lugar.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'Menu', component: MenuPrincipalComponent},
    {path: 'cotizaciones', component: CotizacionesComponent},
    {path: 'cotizaciones/crear', component: CrearCotComponent},
    {path: 'cotizaciones/ver/:id', component: VerCotizacionComponent},

    {path: 'clientes', component: ClienteComponent},
    {path: 'clientes/crear', component: CrearClienteComponent},


    {path: 'lugares', component: LugarComponent}
];

@NgModule(
    {
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
    }
)

export class AppRoutingModule {}
