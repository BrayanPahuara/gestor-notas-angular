import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService  {
  estadoAuth$: Observable<User | null>;

  constructor(
    public  auth: Auth,
    private router: Router
  ){
    this.estadoAuth$ = authState(this.auth);
  }
  async register(email: string, password: string): Promise<void> {
      await createUserWithEmailAndPassword(this.auth, email, password);
  }
  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }
  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
  esAutenticado(): Observable<boolean> {
    return this.estadoAuth$.pipe(map((user) => !!user));
  }
  getUserId(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }
  getUserEmail(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.email : null;
  }
}

