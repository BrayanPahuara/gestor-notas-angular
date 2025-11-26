import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Estudiantes } from '../../services/estudiantes';
import { Estudiante, GRADOS } from '../../interfaces/estudiante';

@Component({
  selector: 'app-gestion-academica',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './gestion-academica.html',
  styleUrl: './gestion-academica.scss',
})
export class GestionAcademica implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private estudiantes = inject(Estudiantes);

  estudianteForm! : FormGroup;

  isEditMode = false;
  estudianteId: string | null = null;
  isLoading = false;
  
  grados = GRADOS;

  ngOnInit(): void{
    this.initForm();
    this.checkEditMode();
  }
  private initForm(): void {
    this.estudianteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      grado: ['', [Validators.required]],
    });
  }
  
  private checkEditMode(): void {
    this.estudianteId = this.route.snapshot.paramMap.get('id');
    if(this.estudianteId){
      this.isEditMode = true;
      this.loadEstudiante(this.estudianteId);
    }
  }
  
  private loadEstudiante(id: string): void {
    this.isLoading = true;
    this.estudiantes.getEstudianteById(id).subscribe({
      next:(estudiante)=>{
        if(estudiante){
          this.estudianteForm.patchValue(estudiante);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Guardar estudiante (crear o actualizar)
  async onSubmit(): Promise<void> {
    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched(); // Marca los errores en rojo
      return;
    }

    this.isLoading = true;
    const formData = this.estudianteForm.value;

    try {
      if (this.isEditMode && this.estudianteId) {
        // MODO EDICIÓN
        await this.estudiantes.updateEstudiante(this.estudianteId, formData);
        alert('¡Estudiante actualizado correctamente!');
      } else {
        // MODO CREACIÓN
        const nuevoEstudiante: Estudiante = {
          ...formData,
          usuarioId: 'temp-user-id', // (Semana 4: pondremos el ID real)
          fechaCreacion: new Date(),
          activo: true
        };
        await this.estudiantes.addEstudiante(nuevoEstudiante);
        alert('¡Estudiante registrado correctamente!');
      }
      // Volver a la lista
      this.router.navigate(['/mis-cursos']);
    } catch (error) {
      console.error(error);
      alert('Error al guardar.');
    } finally {
      this.isLoading = false;
    }
  }

  // Helper para ver si un campo es inválido en el HTML
  isFieldInvalid(field: string): boolean {
    const control = this.estudianteForm.get(field);
    return !!(control?.invalid && control?.touched);
  }
}
