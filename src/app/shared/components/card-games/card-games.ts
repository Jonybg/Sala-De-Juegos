import { Component, input } from '@angular/core';
import { ICardGames } from '../../../core/models/CardGames';
import { CardNeon } from "../../directives/card-neon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-games',
  imports: [CardNeon, RouterLink],
  templateUrl: './card-games.html',
  styleUrl: './card-games.css',
})
export class CardGames {

  card = input.required<ICardGames>();



}
