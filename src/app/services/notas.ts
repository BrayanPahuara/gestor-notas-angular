import { inject, Injectable } from '@angular/core';
import { Firestore, collection,addDoc,doc,updateDoc,deleteDoc, docData, query, orderBy, collectionData, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Nota } from '../interfaces/nota';

@Injectable({
  providedIn: 'root',
})

export class Notas {
  private firestore = inject(Firestore);
  private collectionName = 'notas';

  //CREATE - agregar notas
  addNota(nota: Nota) {
    const notasRef = collection(this.firestore, this.collectionName);
    return addDoc(notasRef, {...nota, fechaCreacion: new Date()});
  }

  //READ - obtener todas las notas
  getNotas(usuarioId: string): Observable<Nota[]>{
    const notasRef = collection(this.firestore, this.collectionName);
    const q = query(
    notasRef,
    where('usuarioId', '==', usuarioId), // filtrar por usuarioId
    orderBy('fechaCreacion', 'desc')
    );
    return collectionData(q,{idField:'id'}) as Observable<Nota[]>;
  }

  //READ - obtener notas de un estudiante especifico
  getNotasByEstudiante(estudianteId: string): Observable<Nota[]> {
    const notasRef = collection(this.firestore, this.collectionName);
    const q = query(
      notasRef,
      where('estudianteId', '==', estudianteId),
      //orderBy('fechaCreacion', 'desc')
    );
    return collectionData(q,{idField:'id'}) as Observable<Nota[]>;
  }

  //READ - obtener una nota por id para editar
  getNotaById(id: string): Observable<Nota> {
    const notaRef = doc(this.firestore, this.collectionName, id);
    return docData(notaRef, {idField: 'id'}) as Observable<Nota>;
  }

  //UPDATE - actualizar nota
  updateNota(id: string, nota: Partial<Nota>){
    const notaRef = doc(this.firestore, this.collectionName, id);
    return updateDoc(notaRef, nota);
  }
  //DELETE 
  deleteNota(id: string){
    const notaRef = doc(this.firestore, this.collectionName, id);
    return deleteDoc(notaRef);
  }
}
