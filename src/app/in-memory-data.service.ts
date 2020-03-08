import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Ravier' },
      { id: 12, name: 'Spiderman' },
      { id: 13, name: 'Naruto' },
      { id: 14, name: 'Sasuke' },
      { id: 15, name: 'Jiraya' },
      { id: 16, name: 'Flash' },
      { id: 17, name: 'Pain' },
      { id: 18, name: 'Mr Robot' },
      { id: 19, name: 'Matrix' },
      { id: 20, name: 'Vegeta' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
