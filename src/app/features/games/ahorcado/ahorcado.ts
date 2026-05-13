import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth-service';
import { LogJuego } from '../../../core/models/LogJuego';
import { JuegosService } from '../../../core/services/juegos-service/juegos-service';


@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado implements OnInit {
private palabras = [
  'PERRO', 'GATO', 'CASA', 'ARBOL', 'LUNA',
  'COMPUTADORA', 'ANGULAR', 'PELOTA', 'MUÑECA', 'COHETE'
];

letras = signal<string[]>([
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'
])

palabraAdivinar = signal(this.palabrAleatoria());
 letrasAdivinadas = signal<string[]>([]);
 intentosFallidos = signal<number>(0);
 maxIntentos = 6
 authService = inject(AuthService)
 juegoService = inject(JuegosService)
 guardo = signal(false);
cargando = signal(true)


constructor(){
  effect(()=>{
    if(this.gano() || this.perdio()){
      this.guardo.set(true)
      this.registrarResultadoAhorcardo()
    }
  })
}
ngOnInit() {
    setTimeout(() => {
      this.cargando.set(false);
    }, 1500);
  }



palabraOculta = computed(() => {
    return this.palabraAdivinar()
      .split('')
      .map(letra => this.letrasAdivinadas().includes(letra) ? letra : '_')
      .join(' ');
  });

gano = computed(() => !this.palabraOculta().includes('_'));
perdio = computed(() => this.intentosFallidos() >= this.maxIntentos);

seleccionarLetra(letra: string) {
    if (this.gano() || this.perdio() || this.letrasAdivinadas().includes(letra)) return;

    this.letrasAdivinadas.update(l => [...l, letra]);

    if (!this.palabraAdivinar().includes(letra)) {
      this.intentosFallidos.update(v => v + 1);
    }
  }

  reiniciar() {
    this.letrasAdivinadas.set([]);
    this.intentosFallidos.set(0);
    this.guardo.set(false)
    this.palabraAdivinar.set(this.palabrAleatoria());
  }

  private palabrAleatoria(): string {
  return this.palabras[Math.floor(Math.random() * this.palabras.length)];
}



  async registrarResultadoAhorcardo(){
    const user = this.authService.usuario()
    if(!user) return


    const log: LogJuego={
      usuario_id:user.id,
      juego: 'ahorcado',
      puntaje: this.gano() ? 100 : 0,
      fecha: new Date(),
      detalles:{
        palabra: this.palabraAdivinar(),
        intentos_Fallidos: this.intentosFallidos(),
        letras_usadas : this.letrasAdivinadas(),
        resultado: this.gano() ? 'victoria' : 'derrota'
      }

    }

    try{
      await this.juegoService.guardarResultado(log)
    }catch(error){
      console.error('Error al guardar', error)
    }


  }


    


}
