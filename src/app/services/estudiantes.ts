import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root',
})
export class Estudiantes {
  constructor(private firestore: Firestore) {}
  addEstudiante(estudiante: Estudiante) {
    const estudiantesRef = collection(this.firestore, 'estudiantes');
    return addDoc(estudiantesRef, estudiante);
  }
  getEstudiantes(): Observable<Estudiante[]> {
    const estudiantesRef = collection(this.firestore, 'estudiantes');
    return collectionData(estudiantesRef, { idField: 'id' }) as Observable<Estudiante[]>;
  }
}
