
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    {path: 'Menu', component: MenuPrincipalComponent}
];

@NgModule(
    {
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
    }
)

export class AppRoutingModule {}
