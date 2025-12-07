import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

    async onSubmit() {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        this.router.navigate(['/mis-cursos']);
      } catch (error: any) {
        this.errorMessage =  this.traducirError(error.code);
      } finally {
        this.isLoading = false;
      }
    }
    private traducirError(codigo: string): string {
      const errores: { [key: string]: string } = {
        'auth/user-not-found': 'Usuario no encontrado.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/invalid-email': 'Correo electrónico inválido.',
        'auth/invalid-credentials': 'Credenciales inválidas.',
      };
      return errores[codigo] || 'Error al iniciar sesion';
    }
    isFieldInvalid(field: string): boolean {
      const control = this.loginForm.get(field);
      return !!(control?.invalid && control?.touched);
  }
}