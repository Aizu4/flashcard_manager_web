import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";

const URL = environment.backendUrl + 'decks/'

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  constructor(private http: HttpClient) {
  }

  getDeckList() {
    return this.http.get<any>(URL);
  }

  createDeck(name: string) {
    return this.http.post<any>(URL, {name});
  }

  deleteDeck(id: string) {
    return this.http.delete(URL + id);
  }
}
