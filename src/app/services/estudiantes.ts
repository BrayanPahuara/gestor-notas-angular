import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData, query, updateDoc, deleteDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class Estudiantes {
  private firestore = inject(Firestore);
  private collectionName = 'estudiantes';
  //CREATE - agregar estudiantes con fechas automaticas
  addEstudiante(estudiante: Estudiante) {
    const estudiantesRef = collection(this.firestore, this.collectionName);
    return addDoc(estudiantesRef, {...estudiante, fechaCreacion: new Date(), activo: true});
  }

  // READ - obtener a todos los estudiantes ordenados por fechas
  getEstudiantes(usuarioId: string): Observable<Estudiante[]> {
    const estudiantesRef = collection(this.firestore, this.collectionName);
    const q = query(
    estudiantesRef,
    where('usuarioId', '==', usuarioId), // filtrar por usuarioId
    orderBy('fechaCreacion', 'desc')
    );
    return collectionData(q, {idField: 'id'}) as Observable<Estudiante[]>;
  }

  // READ - obtener un estudiante por id para editar
  getEstudianteById(id: string): Observable<Estudiante> {
    const estudianteRef = doc(this.firestore, this.collectionName, id);
    return docData(estudianteRef, {idField: 'id'}) as Observable<Estudiante>;
  }

  //UPDATE - actualizar datos
  updateEstudiante(id: string, estudiante: Partial<Estudiante>){
    const estudianteRef = doc(this.firestore, this.collectionName, id);
    return updateDoc(estudianteRef, estudiante);
  }
  //DELETE - eliminar estudiante
  deleteEstudiante(id: string){
    const estudianteRef = doc(this.firestore, this.collectionName, id);
    return deleteDoc(estudianteRef);
  }
} 
