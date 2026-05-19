import { Injectable } from '@angular/core';
import {createClient} from '@supabase/supabase-js'
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SupabaseCliente {
  private readonly supabase_url = environment.URL_SUPABASE;
  private readonly api_key = environment.APIKEY_SUPABASE;
  readonly supabase = createClient(this.supabase_url,this.api_key)

}
