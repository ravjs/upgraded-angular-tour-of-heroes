import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero'; // the interface
// import { HEROES } from '../mock-heroes'; // The data

import { HeroService } from '../hero.service'; // Import of the service
import { MessageService } from '../message.service'; // Import of the service

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService : HeroService, private messageService : MessageService) { } // Declaration of the service

  heroes : Hero[] ;
  selectedHero : Hero  ;
  // heroes = HEROES;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`); // Adding a new message
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes(); // getting Heroes from the service

    // We need to subscribe to the Observable prior to get access to the data
    this.heroService.getHeroes() // This is an observable
      .subscribe(heroes => this.heroes = heroes); // We subscribe

  }

  ngOnInit() {
    this.getHeroes(); // call the function at the initialisation
  }

}
