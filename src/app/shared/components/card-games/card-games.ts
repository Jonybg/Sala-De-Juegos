import { Component, input } from '@angular/core';
import { ICardGames } from '../../../core/models/CardGames';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-games',
  imports: [RouterLink],
  templateUrl: './card-games.html',
  styleUrl: './card-games.css',
})
export class CardGames {

  card = input.required<ICardGames>();



}
