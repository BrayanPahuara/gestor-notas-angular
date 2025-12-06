import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { MisCursos } from './pages/mis-cursos/mis-cursos';
import { DetalleCurso } from './pages/detalle-curso/detalle-curso';
import { GestionAcademica } from './pages/gestion-academica/gestion-academica';
import { Rendimiento } from './pages/rendimiento/rendimiento';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    // Rutas públicas donde cualquiera puede entrar 
    {path: 'login', component: Login},
    {path: 'registro', component: Registro},
    // Rutas protegidas donde se requieren login
    {path: 'mis-cursos', component: MisCursos, canActivate: [authGuard]},
    {path: 'detalle-curso/:id', component: DetalleCurso, canActivate: [authGuard]},
    {path: 'gestion-academica', component: GestionAcademica, canActivate: [authGuard]},
    {path: 'gestion-academica/:id', component: GestionAcademica, canActivate: [authGuard]},
    {path: 'rendimiento', component: Rendimiento, canActivate: [authGuard]},
    {path: 'no-encontrado', component: NoEncontrado},
    {path: '**', redirectTo: 'no-encontrado' }
];
