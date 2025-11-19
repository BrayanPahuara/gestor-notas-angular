import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/curso';

@Injectable({
  providedIn: 'root',
})
export class Cursos {
  constructor(private firestore: Firestore) {}
  addCurso(curso: Curso) {
    const cursosRef = collection(this.firestore, 'cursos');
    return addDoc(cursosRef, curso);
  }
  getCursos(): Observable<Curso[]> {
    const cursosRef = collection(this.firestore, 'cursos');
    return collectionData(cursosRef, { idField: 'id' }) as Observable<Curso[]>;
  }
}
