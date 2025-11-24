import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoNota'
})
export class EstadoNotaPipe implements PipeTransform {

  transform(calificacion: number | string, formato: 'texto' | 'emoji' | 'completo' = 'texto'): string {
    if (calificacion === null || calificacion === undefined) {
      return 'N/A';
    }
    const nota = Number(calificacion);
    if (formato === 'emoji') {
      return nota >= 11 ? '✅' : '❌';
    }
    let texto = '';
    let emoji = '';

    if (nota >= 18) {
      texto = 'Excelente';
      emoji = '🌟';
    } else if (nota >= 15) {
      texto = 'Muy Bueno';
      emoji = '✅';
    } else if (nota >= 11) {
      texto = 'Aprobado';
      emoji = '👍';
    } else if (nota >= 8) {
      texto = 'En Riesgo';
      emoji = '⚠️';
    } else {
      texto = 'Deficiente';
      emoji = '❌';
    }

    if (formato === 'completo') {
      return `${emoji} ${texto}`;
    }
    return texto;
  }

}
