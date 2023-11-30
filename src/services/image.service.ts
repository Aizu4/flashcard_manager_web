import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";

const URL = environment.backendUrl + 'cards/'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  public imageSrcCache = new Map<string, string | null>();


  getImage(id: string) {
    return this.http.get(URL + id + '/image', {responseType: 'blob'});
  }

  uploadImage(id: string, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(URL + id + '/image', formData, {responseType: 'blob'});
  }

  deleteImage(id: string) {
    return this.http.delete(URL + id + '/image');
  }
}
