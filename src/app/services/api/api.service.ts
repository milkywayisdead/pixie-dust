import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseContextInterface } from '../../interfaces/context';
import { urls } from './urls';
import { ContextService } from '../context/context.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { LocaleService } from '../locale/locale.service';
import { catchError, of } from 'rxjs';

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
    private snackbar: SnackbarService,
    private locale: LocaleService
  ) { }

  getProfiles(): Observable<ResponseContextInterface[]> {
    return this.http.get<ResponseContextInterface[]>(urls.profiles)
      .pipe(
        catchError(error => {
          this.snackbar.openSnackbar(this.locale.currentLocale['messages']['errorWhileLoadingProfiles'], 'bg-error');
          return of();
        })
      );
  }

  getProfile(profileId: string): Observable<ResponseContextInterface> {
    return this.http.get<ResponseContextInterface>(`${urls.profile}/${profileId}`)
      .pipe(
        catchError(error => {
          this.snackbar.openSnackbar(this.locale.currentLocale['messages']['errorWhileOpeningProfile'], 'bg-error');
          return of();
        })
      );
  }

  updateProfile(): void {
    const data = this.context.compile();
    const profileId = this.context.getId();
    
    this.http.post<ProfileId>(`${urls.profile}`, data)
      .pipe(
        catchError(error => {
          const messageKey = profileId ? 'errorWhileUpdatingProfile' : 'errorWhileCreatingProfile';
          this.snackbar.openSnackbar(this.locale.currentLocale['messages'][messageKey], 'bg-error');
          return of();
        })
      )
      .subscribe(result => {
        const messageKey = profileId ? 'profileSuccessfullyUpdated' : 'profileSuccessfullyCreated';
        this.context.setId(result.id);
        this.snackbar.openSnackbar(this.locale.currentLocale['messages'][messageKey], 'bg-success');
      });
  }

  deleteProfile(profileId: string): Observable<any> {
    return this.http.delete(`${urls.profile}/${profileId}`)
      .pipe(
        catchError(error => {
          this.snackbar.openSnackbar(this.locale.currentLocale['messages']['errorWhileDeletingProfile'], 'bg-error');
          return of();
        })
      );
  }
}
