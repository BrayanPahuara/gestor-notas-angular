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
  mostrarNavbar = true;
  protected readonly title = signal('GestorNotas');
  constructor() {
    // Escuchar cambios en la ruta para mostrar u ocultar el navbar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      // Ocultar navbar en las rutas de login y registro
      this.mostrarNavbar = !url.includes('/login') && !url.includes('/registro');
    });
  }
}
