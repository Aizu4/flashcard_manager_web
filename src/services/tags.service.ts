import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.development";
import {HttpClient} from "@angular/common/http";

const DECK_URL = environment.backendUrl + 'decks/'
const CARD_URL = environment.backendUrl + 'cards/'

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient) { }

  getDeckTags(deckId: string) {
    return this.http.get<any>(DECK_URL + deckId + '/tags');
  }

  addDeckTag(deckId: string, tag: any) {
    return this.http.post<any>(DECK_URL + deckId + '/tags', tag);
  }

  patchDeckTag(deckId: string, tag: any, newTag: any) {
    return this.http.patch<any>(DECK_URL + deckId + '/tags/' + tag.id, newTag);
  }

  deleteDeckTag(deckId: string, tag: any) {
    return this.http.delete<any>(DECK_URL + deckId + '/tags/' + tag.id);
  }

  getCardTags(cardId: string) {
    return this.http.get<any>(CARD_URL + cardId + '/tags')
  }

  addCardTag(cardId: string, tag: any) {
    return this.http.post<any>(CARD_URL + cardId + '/tags/' + tag.id, tag);
  }

  removeCardTag(cardId: string, tag: any) {
    return this.http.delete<any>(CARD_URL + cardId + '/tags/' + tag.id);
  }
}
