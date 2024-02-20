import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseContextInterface } from '../../interfaces/context';
import { urls } from './urls';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<ResponseContextInterface[]> {
    return this.http.get<ResponseContextInterface[]>(urls.profiles);
  }

  getProfile(profileId: string): Observable<ResponseContextInterface> {
    return this.http.get<ResponseContextInterface>(`${urls.profile}/${profileId}`);
  }
}
