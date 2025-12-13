import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estudiantes } from '../../services/estudiantes';
import { Notas } from '../../services/notas';
import { Estudiante } from '../../interfaces/estudiante';
import { Nota, MATERIAS, PERIODOS } from '../../interfaces/nota';
import { EstadoNotaPipe } from '../../pipes/estado-nota-pipe';
import { AuthService } from '../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rendimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, EstadoNotaPipe, RouterLink],
  templateUrl: './rendimiento.html',
  styleUrl: './rendimiento.scss',
})
export class Rendimiento implements OnInit {
  private estudiantesService = inject(Estudiantes);
  private notasService = inject(Notas);
  private authService = inject(AuthService);

  // Datos
  estudiantes: Estudiante[] = [];
  notas: Nota[] = [];
  notasFiltradas: Nota[] = [];
  
  // Filtros
  filtroMateria = '';
  filtroPeriodo = '';
  filtroEstudiante = '';

  // Opciones para filtros
  materias = MATERIAS;
  periodos = PERIODOS;

  // Estados
  isLoading = true;

  // Estadísticas
  stats = {
    totalEstudiantes: 0,
    totalNotas: 0,
    promedioGeneral: 0,
    aprobados: 0,
    desaprobados: 0,
    porcentajeAprobados: 0,
    mejorPromedio: { nombre: '', promedio: 0 },
    peorPromedio: { nombre: '', promedio: 0 }
  };

  ngOnInit(): void {
    this.cargarDatos();
  }
  private cargarDatos(): void {
    const usuarioId = this.authService.getUserId();
    if (!usuarioId) return;
    // Cargar estudiantes
    this.estudiantesService.getEstudiantes(usuarioId).subscribe(estudiantes => {
      this.estudiantes = estudiantes;
      this.stats.totalEstudiantes = estudiantes.length;
      this.calcularEstadisticas();
    });

    // Cargar notas
    this.notasService.getNotas(usuarioId).subscribe(notas => {
      this.notas = notas;
      this.notasFiltradas = notas;
      this.stats.totalNotas = notas.length;
      this.isLoading = false;
      this.calcularEstadisticas();
    });
  }

  aplicarFiltros(): void {
    this.notasFiltradas = this.notas.filter(nota => {
      const cumpleMateria = !this.filtroMateria || nota.materia === this.filtroMateria;
      const cumplePeriodo = !this.filtroPeriodo || nota.periodo === this.filtroPeriodo;
      const cumpleEstudiante = !this.filtroEstudiante || 
        nota.estudianteNombre?.toLowerCase().includes(this.filtroEstudiante.toLowerCase());
      
      return cumpleMateria && cumplePeriodo && cumpleEstudiante;
    });
  }

  limpiarFiltros(): void {
    this.filtroMateria = '';
    this.filtroPeriodo = '';
    this.filtroEstudiante = '';
    this.notasFiltradas = this.notas;
  }

  private calcularEstadisticas(): void {
    if (this.notas.length === 0) return;

    // Promedio general
    const sumaTotal = this.notas.reduce((acc, n) => acc + Number(n.calificacion), 0);
    this.stats.promedioGeneral = Math.round((sumaTotal / this.notas.length) * 100) / 100;

    // Aprobados y desaprobados
    this.stats.aprobados = this.notas.filter(n => Number(n.calificacion) >= 11).length;
    this.stats.desaprobados = this.notas.length - this.stats.aprobados;
    this.stats.porcentajeAprobados = Math.round((this.stats.aprobados / this.notas.length) * 100);

    // Mejor y peor promedio por estudiante
    if (this.estudiantes.length > 0) {
      const promediosPorEstudiante = this.estudiantes.map(est => {
        const notasEst = this.notas.filter(n => n.estudianteId === est.id);
        if (notasEst.length === 0) return { nombre: est.nombre, promedio: 0 };
        const suma = notasEst.reduce((acc, n) => acc + Number(n.calificacion), 0);
        return { nombre: est.nombre, promedio: Math.round((suma / notasEst.length) * 100) / 100 };
      }).filter(p => p.promedio > 0);

      if (promediosPorEstudiante.length > 0) {
        this.stats.mejorPromedio = promediosPorEstudiante.reduce((a, b) => 
          a.promedio > b.promedio ? a : b
        );
        this.stats.peorPromedio = promediosPorEstudiante.reduce((a, b) => 
          a.promedio < b.promedio ? a : b
        );
      }
    }
  }
}
