import { Component, inject, OnInit, signal } from '@angular/core';
import { ICardGames } from '../../core/models/CardGames';
import { CardGames } from "../../shared/components/card-games/card-games";
import { AuthService } from '../../core/services/auth/auth-service';
import { IUser } from '../../core/models/user';

@Component({
  selector: 'app-home',
  imports: [CardGames],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private AuthService = inject(AuthService)
  user = this.AuthService.usuario
  
  

  

  cards:ICardGames[] =[
    {
      title:"AHORCADO",
      imagen_url: "https://i.postimg.cc/zBgX3W7C/ahorac-ado.png",
      ruta: "/games/ahorcado"
    },
    {
      title: "MAYOR O MENOR",
      imagen_url: "https://i.postimg.cc/76zzrnHt/mayor-o-menor.png",
      ruta: "/games/mayormenor"
    },
    {
      title: "PREGUNTADOS",
      imagen_url :"https://i.postimg.cc/hPZtM7gb/pregunrados.png",
      ruta: "/games/ahorcado"
    },
    {
      title: "ADIVINA AL JUGADOR",
      imagen_url : "https://i.postimg.cc/50fJfxbV/messiabout.png",
      ruta: "/games/ahorcado"
    }
  ]

}

