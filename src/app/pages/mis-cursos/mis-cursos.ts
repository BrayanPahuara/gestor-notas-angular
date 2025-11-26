import { CommonModule} from '@angular/common';
import { Component, inject, OnInit  } from '@angular/core';
import { Estudiantes } from '../../services/estudiantes';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Estudiante } from '../../interfaces/estudiante';
import { map } from 'rxjs/operators';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDoc, deleteDoc, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-mis-cursos',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './mis-cursos.html',
  styleUrl: './mis-cursos.scss',
  
})
export class MisCursos implements OnInit {
  private estudiantes = inject(Estudiantes);
  estudiantes$!: Observable<Estudiante[]>;
  estudiantesFiltrados$!: Observable<Estudiante[]>;
  terminoBusqueda = '';
  isLoading = true;
  mostrarConfirmacion = false;
  estudianteAEliminar: Estudiante | null = null;
  private firestore = inject(Firestore);
  ngOnInit(): void {
    this.cargarEstudiantes();
  }
  private cargarEstudiantes(): void {
    this.estudiantes$ = this.estudiantes.getEstudiantes();
    this.estudiantesFiltrados$ = this.estudiantes$;
    this.estudiantes$.subscribe(() => {
      this.isLoading = false;
    });
  }
  filtrarEstudiantes(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.estudiantesFiltrados$ = this.estudiantes$;
      return;
    }
    this.estudiantesFiltrados$ = this.estudiantes$.pipe(
      map(estudiantes => 
        estudiantes.filter(est => 
          est.nombre.toLowerCase().includes(termino) ||
          est.codigo.toLowerCase().includes(termino) ||
          est.correo.toLowerCase().includes(termino)
        )
      )
    );
  }
  confirmarEliminar(estudiante: Estudiante): void {
    this.estudianteAEliminar = estudiante;
    this.mostrarConfirmacion = true;
  }
  cancelarEliminar(): void {
    this.mostrarConfirmacion = false;
    this.estudianteAEliminar = null;
  }
  async eliminarEstudiante(): Promise<void> {
    if (!this.estudianteAEliminar?.id) return;
    try {
      const notasRef = collection(this.firestore, 'notas');
      const q = query(notasRef, where('estudianteId', '==', this.estudianteAEliminar.id));
      const snapshot = await getDocs(q);
      for (const doc of snapshot.docs) {
        await deleteDoc(doc.ref);
      }

      await this.estudiantes.deleteEstudiante(this.estudianteAEliminar.id);
      this.cancelarEliminar();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }
}
