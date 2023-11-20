import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.development";
import {HttpClient} from "@angular/common/http";

const URL = environment.backendUrl

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  createTag(deckId: string, tag: any) {
    return this.http.post<any>(URL + 'decks/' + deckId + '/tags/', tag);
  }

  deleteTag(deckId: string, tagId: string) {
    return this.http.delete(URL + 'decks/' + deckId + '/tags/' + tagId);
  }
}
