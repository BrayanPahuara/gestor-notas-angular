import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  mostrarNavbar = false;
  protected readonly title = signal('GestorNotas');
  constructor() {
    // Escuchar cambios en la ruta para mostrar u ocultar el navbar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      // Lista de rutas donde no se muestra el navbar
      const rutasSinNavbar = ['/login', '/registro', '/no-encontrado'];
      // Verificar si la ruta actual está en la lista
      const esRutaLimpia = rutasSinNavbar.some(ruta => url.includes(ruta));
      this.mostrarNavbar = !esRutaLimpia;
    });
  }
}
