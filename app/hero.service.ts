import 'rxjs/add/operator/toPromise';
import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private headers   = new Headers({ 'Content-Type': 'application/json' });
  private heroesUrl = 'api/heroes';

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroesUrl)
      .toPromise()
      .then(res => res.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.http
      .get(`${this.heroesUrl}/${id}`)
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<any> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<any> {
    return this.http
      .put(`${this.heroesUrl}/${hero.id}`, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.heroesUrl}/${id}`, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
