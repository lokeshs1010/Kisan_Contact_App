import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  API_URL: String = 'http://13.127.47.55:3000/';

  constructor(private http: HttpClient) { }

  public getAllContacts = (): Observable<any> => {
      return this.http.get(`${this.API_URL}getAllContacts`);
  }

  public getOneContact = (params): Observable<any> => {
    return this.http.get(`${this.API_URL}getOneContact/${params}`);
}

public getMessageDetails = (): Observable<any> => {
  return this.http.get(`${this.API_URL}getMessageDetails`);
}

public createContact = (data): Observable<any> => {
  const param = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('phoneNumber', data.phoneNumber);

  // console.log(param, data.authtoken);
  return this.http.post(this.API_URL + `createContact`, param);
}// end

public sendMessage = (data): Observable<any> => {
  const param = new HttpParams()
    .set('text', data.text)
    .set('id', data.id);

  // console.log(param, data.authtoken);
  return this.http.post(this.API_URL + `sendMessage`, param);
}// end

}
