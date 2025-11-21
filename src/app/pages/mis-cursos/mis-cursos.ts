import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Estudiantes } from '../../services/estudiantes';

@Component({
  selector: 'app-mis-cursos',
  imports: [CommonModule],
  templateUrl: './mis-cursos.html',
  styleUrl: './mis-cursos.scss',
})
export class MisCursos {
  private estudiantes = inject(Estudiantes);
  estudiantes$ = this.estudiantes.getEstudiantes();
}
