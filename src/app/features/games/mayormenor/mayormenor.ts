import { Component, inject, OnInit, signal } from '@angular/core';
import { JuegosService } from '../../../core/services/juegos-service/juegos-service';
import { AuthService } from '../../../core/services/auth/auth-service';
import { LogJuego } from '../../../core/models/LogJuego';

@Component({
  selector: 'app-mayormenor',
  imports: [],
  templateUrl: './mayormenor.html',
  styleUrl: './mayormenor.css',
})
export class Mayormenor implements OnInit {
  private juegosService = inject(JuegosService);
  private authService = inject(AuthService);

  cartaActual = signal<number>(this.generarNumero());
  proximaCarta = signal<number>(this.generarNumero());
  puntaje = signal<number>(0);
  perdio = signal<boolean>(false);
  mensaje = signal<string>('¿La próxima será mayor o menor?');
  cargando = signal(true)

  ngOnInit() {
    setTimeout(() => {
      this.cargando.set(false);
    }, 1500);
  }

  generarNumero(): number {
    return Math.floor(Math.random() * 12) + 1;
  }

  jugar(eleccion: 'mayor' | 'menor') {
    const actual = this.cartaActual();
    const proxima = this.proximaCarta();

    if ((eleccion === 'mayor' && proxima > actual) || 
        (eleccion === 'menor' && proxima < actual)) {
      this.puntaje.update(p => p + 1);
      this.mensaje.set('¡Correcto! Sigue así.');
      this.avanzarCarta();
    } else if (proxima === actual) {
      this.mensaje.set('¡Empate! No sumas puntos.');
      this.avanzarCarta();
    } else {
      this.perdio.set(true);
      this.mensaje.set(`Perdiste. Salió el ${proxima}.`);
      this.registrarResultado();
    }
  }

  avanzarCarta() {
    this.cartaActual.set(this.proximaCarta());
    this.proximaCarta.set(this.generarNumero());
  }

  async registrarResultado() {
    const usuario = this.authService.usuario();
    if (!usuario) return;

    const log :LogJuego= {
      usuario_id: usuario.id,
      juego: 'mayor-menor',
      puntaje: this.puntaje(),
      fecha: new Date(),
      detalles: {
        cartas_acertadas: this.puntaje(),
        ultima_carta: this.proximaCarta()
      }
    };
    try{
      await this.juegosService.guardarResultado(log)
    }catch(error){
      console.error('Error al guardar', error)
    }
  }

  reiniciar() {
    this.cartaActual.set(this.generarNumero());
    this.proximaCarta.set(this.generarNumero());
    this.puntaje.set(0);
    this.perdio.set(false);
    this.mensaje.set('¿La próxima será mayor o menor?');
  }
}
