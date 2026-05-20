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
  private readonly juegosService = inject(JuegosService);
  private readonly authService = inject(AuthService);

  readonly cartaActual = signal<number>(this.generarNumero());
  readonly proximaCarta = signal<number>(this.generarNumero());
  readonly puntaje = signal<number>(0);
  private readonly _perdio = signal<boolean>(false);
  readonly perdio = this._perdio.asReadonly()
  private readonly _mensaje = signal<string>('¿La próxima será mayor o menor?');
  readonly mensaje = this._mensaje.asReadonly()
  private readonly _cargando = signal<boolean>(true);
  readonly cargando = this._cargando.asReadonly();

  ngOnInit() {
    setTimeout(() => {
      this._cargando.set(false);
    }, 1500);
  }

  private generarNumero(): number {
    return Math.floor(Math.random() * 12) + 1;
  }

  jugar(eleccion: 'mayor' | 'menor') {
    const actual = this.cartaActual();
    const proxima = this.proximaCarta();

    if ((eleccion === 'mayor' && proxima > actual) || 
        (eleccion === 'menor' && proxima < actual)) {
      this.puntaje.update(p => p + 1);
      this._mensaje.set('¡Correcto! Sigue así.');
      this.avanzarCarta();
    } else if (proxima === actual) {
      this._mensaje.set('¡Empate! No sumas puntos.');
      this.avanzarCarta();
    } else {
      this._perdio.set(true);
      this._mensaje.set(`Perdiste. Salió el ${proxima}.`);
      this.registrarResultado();
    }
  }

  private avanzarCarta() {
    this.cartaActual.set(this.proximaCarta());
    this.proximaCarta.set(this.generarNumero());
  }

  private async registrarResultado() {
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
    this._perdio.set(false);
    this._mensaje.set('¿La próxima será mayor o menor?');
  }
}
