import { Component, OnInit, Input} from '@angular/core';
import { Hero } from '../hero';

//The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
import { ActivatedRoute } from '@angular/router';
//The location is an Angular service for interacting with the browser
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero; // Allow this property to be bind by NgModel

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    //The route.snapshot is a static image of the route information shortly after the component was created.
    //The paramMap is a dictionary of route parameter values extracted from the URL.
    //The "id" key returns the id of the hero to fetch.
    const id = +this.route.snapshot.paramMap.get('id');
    //Route parameters are always strings. The JavaScript (+) operator converts
    //the string to a number, which is what a hero id should be.
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  //TODO : Save the change of the Hero
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }



}
