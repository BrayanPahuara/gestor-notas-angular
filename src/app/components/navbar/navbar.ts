import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);
  // obtener el email del usuario autenticado
  get usuarioEmail(): string | null {
    return this.authService.getUserEmail();
  }
  // cerrar sesión 
  async cerrarSesion(): Promise<void> {
    const confirmar = confirm('¿Estás seguro que deseas cerrar sesión?');
    if (confirmar) {
      await this.authService.logout();
    }
  }
}