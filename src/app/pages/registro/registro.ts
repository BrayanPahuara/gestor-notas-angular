import { CommonModule } from '@angular/common';
import { Component, inject  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router);

  registroForm: FormGroup
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsCoinciden
    });
  }
  // verificar que las contraseñas coincidan
  passwordsCoinciden(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmar = control.get('confirmarPassword');

    if (!password || !confirmar) {
      return null;
    }

    if (password.value !== confirmar.value) {
      confirmar.setErrors({ noCoinciden: true });
      return { noCoinciden: true };
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const { email, password } = this.registroForm.value;
    try {
      // Registrar usuario
      await this.authService.register(email, password);
      // Redirigir al login
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = this.traducirError(error.code);
    } finally {
      this.isLoading = false;
    }
    }
  private traducirError(codigo: string): string {
    const errores: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'Correo inválido',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/operation-not-allowed': 'Operación no permitida'
    };
    return errores[codigo] || 'Error al registrar usuario';
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registroForm.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
