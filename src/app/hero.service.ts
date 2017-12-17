import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

/**** Start with HTTP *****/
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HeroService {

  private heroesUrl = 'http:\/\/lqicme9c-site.gtempurl.com/api/users';  // URL to web api
 
  // constructor(private messageService: MessageService) { }
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {

      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(heroes => this.log(`fetched heroes`)),
          catchError(this.handleError('getHeroes', []))
        );
    }

    

  /*getHeroes(): Hero[] {
  	return HEROES;
  }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }*/

  /*getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }*/

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
   // this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id));
    this.heroesUrl = this.heroesUrl + '?args=' + id;
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
           tap(_ => this.log(`fetched hero id=${id}`)),
          catchError(this.handleError<Hero>(getHero id=${id}))
        );
  }


  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
