import { inject, Injectable, signal } from '@angular/core';
import { SupabaseCliente } from '../supabasecliente/supabase-cliente';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase = inject(SupabaseCliente);
  private authService = inject(AuthService);

  public mensajes = signal<any[]>([]);
  public textoMensaje = signal<string>("");
  
  usuario = this.authService.usuario;

  constructor() {
    this.cargarMensajes();
    this.escucharMensajes();
  }

async cargarMensajes() {
  const { data, error } = await this.supabase.supabase
    .from('mensajes')
    .select(`
  *,
  usuarios (
    nombre,
    apellido,
    email
  )
`)
    .order('created_at', { ascending: true });

  console.log(data);

  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    this.mensajes.set(data);
  }
}



async escucharMensajes() {
  this.supabase.supabase
    .channel('sala-chat')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'mensajes',
      },
      async () => {
        await this.cargarMensajes();
      }
    )
    .subscribe();
}

  async enviar() {
    const contenido = this.textoMensaje();
    const user = this.usuario(); 

    if (contenido === "") return;

    await this.supabase.supabase
      .from('mensajes')
      .insert([
        {
          user_id: user?.id,
          content: contenido,
        }
      ]);

    this.textoMensaje.set(""); 
  }
}