import { inject, Injectable, signal } from '@angular/core';
import { SupabaseCliente } from '../supabasecliente/supabase-cliente';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

private supabaseService = inject(SupabaseCliente)
private supabase = this.supabaseService.supabase;
private router = inject(Router)
private userAuth = signal<any>(null);
private userId = signal<IUser | null>(null);
usuario = this.userId.asReadonly();

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
    this.redirigirAlLogin()
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

     this.userAuth.set(data.user?.id)

     await this.traerUsuario(this.userAuth())
     this.redirigirAlHome()

  }

 

  async traerUsuario(userAuth:any){
    const {data:usuario} = await this.supabase
    .from('usuarios')
    .select('*')
    .eq('auth_id',userAuth)
    .single();
    this.userId.set(usuario)
  }

  redirigirAlLogin(){
    this.router.navigate(['/auth/login'])
  }

  redirigirAlHome(){
    this.router.navigate(['/home'])
  }

  async haySesion():Promise<boolean>{
    const {data} = await this.supabase.auth.getSession();
    if(data.session){
      return true;
    } else{
      return false;
    }
  }

  async logOut(){
    this.supabase.auth.signOut();
    this.router.navigate(['/auth/login'])
  }


}
