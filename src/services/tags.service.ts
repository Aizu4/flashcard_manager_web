import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.development";
import {HttpClient} from "@angular/common/http";

const DECK_URL = environment.backendUrl + 'decks/'

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
}
