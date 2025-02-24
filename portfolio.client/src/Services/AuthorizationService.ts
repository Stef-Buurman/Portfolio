import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private apiKey: string | null = null;
  private apiUrl = '/api/create-api-key';

  constructor(private http: HttpClient) {
  }

  getApiKey() {
    this.http.get<{apiKey:string}>(this.apiUrl)
      .subscribe({
        next: (response: { apiKey: string }) =>        {
            this.apiKey = response.apiKey;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  removeApiKey() {
    this.apiKey = null
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.apiKey ?? "",
    });
  }

  postRequestWithData<T, R>(url: string, data: T): Observable<R> {
    var headers = this.getHeaders();
    return this.http.post<R>(url, data, { headers })
  }

  getRequest<T>(url: string, apiKey?: string): Observable<T> {
    var headers = this.getHeaders();
    if (apiKey) {
      headers = headers.set('Authorization', apiKey);
    }
    return this.http.get<T>(url, { headers });
  }

  deleteRequest<T>(url: string, apiKey?: string): Observable<T> {
    var headers = this.getHeaders();
    if (apiKey) {
      headers = headers.set('Authorization', apiKey);
    }
    return this.http.delete<T>(url, { headers });
  }
}
