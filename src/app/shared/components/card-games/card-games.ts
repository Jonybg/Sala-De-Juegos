import { Component, input } from '@angular/core';
import { ICardGames } from '../../../core/models/CardGames';

@Component({
  selector: 'app-card-games',
  imports: [],
  templateUrl: './card-games.html',
  styleUrl: './card-games.css',
})
export class CardGames {

  card = input.required<ICardGames>();



}
