import { Component, inject, Injectable } from '@angular/core';
;
import { LogJuego } from '../../models/LogJuego';
import { SupabaseCliente } from '../supabasecliente/supabase-cliente';

@Injectable({
  providedIn: 'root' 
})
export class JuegosService {

  private supabase = inject(SupabaseCliente)

  async guardarResultado(log:LogJuego){
    const {data,error} = await this.supabase.supabase.from('resultados')
    .insert([log])
    if (error) throw error;
    return data;
  }

  
    
  



}
