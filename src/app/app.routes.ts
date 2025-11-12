import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { MisCursos } from './pages/mis-cursos/mis-cursos';
import { DetalleCurso } from './pages/detalle-curso/detalle-curso';
import { GestionAcademica } from './pages/gestion-academica/gestion-academica';
import { Rendimiento } from './pages/rendimiento/rendimiento';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: Login},
    {path: 'registro', component: Registro},
    {path: 'mis-cursos', component: MisCursos},
    {path: 'detalle-curso/:id', component: DetalleCurso},
    {path: 'gestion-academica', component: GestionAcademica},
    {path: 'gestion-academica/:id', component: GestionAcademica},
    {path: 'rendimiento', component: Rendimiento},
    {path: 'no-encontrado', component: NoEncontrado},
    {path: '**', redirectTo: 'no-encontrado' }
];
