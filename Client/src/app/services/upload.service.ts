import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // SERVER_URL: string = "http://localhost:3001/file";
  constructor(private httpClient: HttpClient) { }

  public upload(formData) {
 
    return this.httpClient.post<any>("/api/Products/file", formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
