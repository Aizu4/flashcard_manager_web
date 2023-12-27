import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";

const URL = environment.backendUrl + 'cards/'

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) {
  }
  createCard(deck_id: string, body: any) {
    return this.http.post<any>(URL, body, {params: {deck_id: deck_id}});
  }

  patchCard(id: string, body: any) {
    return this.http.patch<any>(URL + id, body);
  }

  deleteCard(id: string) {
    return this.http.delete(URL + id);
  }

  generateTranslations(id: string, body: any) {
    return this.http.post<any>(URL + id + '/generate_translations', body);
  }

  generateExamples(id: string, body: any) {
    return this.http.post<any>(URL + id + '/generate_sentences', body);
  }
}
