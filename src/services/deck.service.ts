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

  getDeck(id: string) {
    return this.http.get<any>(URL + id)
  }

  createDeck(name: string) {
    return this.http.post<any>(URL, {name});
  }

  patchDeck(id: string, body: any) {
    return this.http.patch<any>(URL + id, body);
  }

  deleteDeck(id: string) {
    return this.http.delete(URL + id);
  }

  deleteEmptyCards(id: string) {
    return this.http.delete(URL + id + '/empty_cards');
  }

  exportDeckToCSV(id: string, settings: any) {
    return this.http.post(URL + id + '/export', settings, {responseType: 'text'});
  }
}
