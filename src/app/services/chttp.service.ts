import { Injectable } from '@angular/core';
import { environment } from '../dev/environment.development';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChttpService {
  constructor(
    private readonly http: HttpClient
  ) {}

  /**
   * Get common request headers including optional authentication headers.
   * @param {boolean} isAuth - Whether the request requires authentication headers.
   * @returns {HttpHeaders} - Common request headers.
   */
  public getRequsetOptions(isAuth: boolean, formData: boolean): HttpHeaders {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization, X-Requested-With',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });

    if (!formData) {
      headers = headers.set('Content-Type', 'application/json;charset=UTF-8');
    }

    if (isAuth) {
      // Add authorization headers if necessary
    }

    return headers;
  }

  /**
   * Get the server URL.
   * @returns {string} - The server URL.
   */
  private getServerUrl(): string {
    return environment.BaseUrl;
  }

  /**
   * Parse options for Angular HTTP requests.
   * @param {any} options - Options for the HTTP request.
   * @returns {any} - Parsed options for Angular HTTP.
   */
  private parseOptionsForAngularHttp(options: any): any {
    let angularOptions: any = options || {};
    angularOptions.responseType = angularOptions.responseType || 'json';
    angularOptions.observe = angularOptions.observe || 'response';
    return angularOptions;
  }

  /**
   * Make a POST request.
   * @param {string} command - The command for the POST request.
   * @param {any} body - The request body.
   * @param {boolean} isAuth - Whether the request requires authentication headers. Default is false.
   * @returns {Observable<any>} - Observable for the POST request.
   */
  public post(command: string, body: any, isAuth: boolean = false ,formData = false): Observable<any> {
    const options = {
      headers: this.getRequsetOptions(isAuth ,formData),
    };
    const url = this.getServerUrl() + (command || '');
    return this.http.post(url, body, this.parseOptionsForAngularHttp(options));
  }

  /**
   * Make a GET request.
   * @param {string} command - The command for the GET request.
   * @param {HttpParams} queryParams - The query parameters for the GET request. Default is an empty HttpParams.
   * @param {boolean} isAuth - Whether the request requires authentication headers. Default is false.
   * @returns {Observable<any>} - Observable for the GET request.
   */
  public get(command: string, queryParams: HttpParams = new HttpParams(), isAuth = false): Observable<any> {

    // Create the base URL
    const url = `${this.getServerUrl()}${command || ''}`;

    // Check if there are query parameters to append
    const urlWithParams = queryParams.keys().length ? `${url}?${queryParams.toString()}` : url;

    return this.http.get(urlWithParams, { headers: this.getRequsetOptions(isAuth, false) }).pipe(
      catchError(error => {
        console.error(`Error in GET request for ${command}:`, error);
        return throwError(() => new Error(`Failed to fetch data for ${command}. Please try again.`));
      })
    );
  }

  /**
   * Get company information by presentment ID.
   * @param {number} presentmentId - The presentment ID for the GET request.
   * @returns {Observable<any>} - Observable for the GET request.
   */
  public getInfo(presentmentId: number): Observable<any> {
    const command = `getCompanyInfo/${presentmentId}`;
    return this.get(command, new HttpParams(), true);
  }
}
