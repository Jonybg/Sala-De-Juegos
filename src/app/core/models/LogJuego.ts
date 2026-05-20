export interface LogJuego {
    id? : number,
    usuario_id: number,
    juego: 'ahorcado' | 'mayor-menor' | 'preguntados' | 'propio',
    puntaje: number,
    detalles: any,
    fecha?: Date;
}