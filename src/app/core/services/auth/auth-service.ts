import { inject, Injectable, signal } from '@angular/core';
import { SupabaseCliente } from '../supabasecliente/supabase-cliente';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

private readonly supabaseService = inject(SupabaseCliente)
private readonly supabase = this.supabaseService.supabase;
private readonly router = inject(Router)
private readonly userAuth = signal<any>(null);
private _userId = signal<IUser | null>(null);
readonly usuario = this._userId.asReadonly();

constructor() {
  this.supabase.auth.getSession().then(({ data } :any ) => {
    if (data.session) {
      this.traerUsuario(data.session.user.id); 
    }
  });
}

  async register(form: any) {
    const { data, error } = await this.supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })
    if(error) throw error;

    await this.rellenartabla(form,data)

    if (data.user) {
      this.userAuth.set(data.user.id);
      await this.traerUsuario(data.user.id);
    }
  }



  async rellenartabla(form:any,data:any){
      const {error: Error} = await this.supabase.from('usuarios').insert({
      auth_id : data.user?.id,
      email: form.email,
      nombre: form.nombre,
      apellido: form.apellido,
      edad: form.edad
    });

    if(Error) throw Error
  }

  async login(form:any){
    const {data,error} = await this.supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })

    if(error) throw error;
    if (!data.user) {
    throw new Error('No se obtuvo el usuario');
  }


     this.userAuth.set(data.user?.id)

     await this.traerUsuario(this.userAuth())
  }

 

  async traerUsuario(userAuth:any){
    const {data:usuario} = await this.supabase
    .from('usuarios')
    .select('*')
    .eq('auth_id',userAuth)
    .single();
    this._userId.set(usuario)
  }

  redirigirAlLogin(){
    this.router.navigate(['/auth/login'])
  }

  redirigirAlHome(){
    this.router.navigate([''])
  }

  async haySesion(): Promise<boolean> {
    const { data } = await this.supabase.auth.getSession();
   if (data.session) {
    if (!this._userId()) { 
      await this.traerUsuario(data.session.user.id);
    }
    return true;
  }
  
  return false;
}

  async logOut(){
    this.supabase.auth.signOut();
    this._userId.set(null);
    this.router.navigate(['/auth/login'])
  }


}
