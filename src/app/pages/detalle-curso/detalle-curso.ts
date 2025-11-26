import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Estudiantes } from '../../services/estudiantes';
import { Notas } from '../../services/notas';
import { Estudiante } from '../../interfaces/estudiante';
import { Nota, MATERIAS, TipoEvaluacion, PERIODOS } from '../../interfaces/nota';
import { EstadoNotaPipe } from '../../pipes/estado-nota-pipe';
@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, EstadoNotaPipe],
  templateUrl: './detalle-curso.html',
  styleUrl: './detalle-curso.scss',
})

export class DetalleCurso implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private estudiantes = inject(Estudiantes);
  private notasService = inject(Notas);

  //Datos
  estudiante: Estudiante | null = null;
  notas: Nota[] = [];

  //Opciones para selects
  materias = MATERIAS;
  periodos = PERIODOS;
  tiposEvaluacion = Object.values(TipoEvaluacion);

  //Estados
  isLoading = true;
  mostrarFormNota = false;
  isEditingNota = false;
  notaEditandoId: string | null = null;
  isSaving = false;

  //Formulario
  notaForm!: FormGroup;

  // Modal Eliminar
  mostrarConfirmacion = false;
  notaAEliminar: Nota | null = null;
  ngOnInit(): void {
    this.initForm();
    this.cargarDatos();
  }

  // 1. Inicializar Formulario
  private initForm(): void {
    this.notaForm = this.fb.group({
      materia: ['', Validators.required],
      calificacion: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      tipo: ['', Validators.required],
      periodo: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required], // Fecha de hoy por defecto
      observaciones: ['']
    });
  }

  // 2. Cargar Estudiante y sus Notas
  private cargarDatos(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/mis-cursos']);
      return;
    }
    this.isLoading = true;

    // A. Obtener Estudiante
    this.estudiantes.getEstudianteById(id).subscribe({
      next: (est) => {
        if (!est) {
          this.router.navigate(['/mis-cursos']);
          return;
        }
        this.estudiante = est;
        
        // B. Obtener sus Notas (Una vez tenemos al estudiante)
        this.notasService.getNotasByEstudiante(id).subscribe({
          next: (notas) => {
            this.notas = notas;
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.router.navigate(['/mis-cursos']);
      }
    });
  }

  // 3. Cálculos (Getters)
  get promedio(): number {
    if (this.notas.length === 0) return 0;
    const suma = this.notas.reduce((acc, nota) => acc + Number(nota.calificacion), 0);
    return Math.round((suma / this.notas.length) * 100) / 100;
  }

  get estadoPromedio(): string {
    if (this.notas.length === 0) return 'Sin notas';
    return this.promedio >= 11 ? 'Aprobado' : 'Desaprobado';
  }

  // 4. Lógica del Formulario (Mostrar/Ocultar)
  toggleFormNota(): void {
    this.mostrarFormNota = !this.mostrarFormNota;
    if (!this.mostrarFormNota) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.notaForm.reset({
      fecha: new Date().toISOString().split('T')[0]
    });
    this.isEditingNota = false;
    this.notaEditandoId = null;
  }

  // 5. Preparar Edición
  editarNota(nota: Nota): void {
    this.isEditingNota = true;
    this.notaEditandoId = nota.id || null;
    this.mostrarFormNota = true;

    // Formatear fecha para el input date
    let fechaFormateada = '';
    if (nota.fecha) {
      // Manejar si viene como Timestamp de Firebase o Date normal
      const fecha = (nota.fecha as any).toDate ? (nota.fecha as any).toDate() : new Date(nota.fecha);
      fechaFormateada = fecha.toISOString().split('T')[0];
    }

    this.notaForm.patchValue({
      materia: nota.materia,
      calificacion: nota.calificacion,
      tipo: nota.tipo,
      periodo: nota.periodo,
      fecha: fechaFormateada,
      observaciones: nota.observaciones
    });
  }

  // 6. Guardar Nota (Create / Update)
  async guardarNota(): Promise<void> {
    if (this.notaForm.invalid || !this.estudiante || !this.estudiante.id) {
      this.notaForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValues = this.notaForm.value;

    try {
      const datosNota: any = {
        ...formValues,
        fecha: new Date(formValues.fecha) // Convertir string a Date
      };

      if (this.isEditingNota && this.notaEditandoId) {
        // Actualizar
        await this.notasService.updateNota(this.notaEditandoId, datosNota);
      } else {
        // Crear
        datosNota.estudianteId = this.estudiante.id;
        datosNota.estudianteNombre = this.estudiante.nombre;
        datosNota.usuarioId = 'temp-user-id'; // Semana 4: ID real
        
        await this.notasService.addNota(datosNota);
      }
      
      this.toggleFormNota(); // Cierra el form
    } catch (error) {
      console.error(error);
      alert('Error al guardar la nota');
    } finally {
      this.isSaving = false;
    }
  }

  // 7. Eliminar Nota
  confirmarEliminar(nota: Nota): void {
    this.notaAEliminar = nota;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminar(): void {
    this.mostrarConfirmacion = false;
    this.notaAEliminar = null;
  }

  async eliminarNota(): Promise<void> {
    if (!this.notaAEliminar?.id) return;
    try {
      await this.notasService.deleteNota(this.notaAEliminar.id);
      this.cancelarEliminar();
    } catch (error) {
      console.error(error);
    }
  }
}
