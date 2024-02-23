import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseContextInterface } from '../../interfaces/context';
import { urls } from './urls';
import { ContextService } from '../context/context.service';

interface ProfileId {
  id: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private  http: HttpClient,
    private context: ContextService,
  ) { }

  getProfiles(): Observable<ResponseContextInterface[]> {
    return this.http.get<ResponseContextInterface[]>(urls.profiles);
  }

  getProfile(profileId: string): Observable<ResponseContextInterface> {
    return this.http.get<ResponseContextInterface>(`${urls.profile}/${profileId}`);
  }

  updateProfile(): void {
    const data = this.context.compile();
    this.http.post<ProfileId>(`${urls.profile}`, data)
      .subscribe(result => {
        this.context.setId(result.id);
      });
  }

  deleteProfile(profileId: string): Observable<any> {
    return this.http.delete(`${urls.profile}/${profileId}`);
  }
}
