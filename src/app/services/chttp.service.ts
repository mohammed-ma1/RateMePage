import { Injectable } from '@angular/core';
import { environment } from '../dev/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import {
  HttpClient,
  HttpClient as angularHttp,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable({
  providedIn: 'root'
})
/**
 * ChttpService provides HTTP request methods with optional authentication headers.
 * Created by Laith Bzour.
 */
export class ChttpService {
  public angularHttp: HttpClient;
  constructor(
    private readonly angular: angularHttp,
    private readonly http: HttpClient,
  ) {
    this.angularHttp = angular;
  }
  /**
   * Get common request headers including optional authentication headers.
   * @param {boolean} isAuth - Whether the request requires authentication headers.
   * @returns {Record<string, string>} - Common request headers.
   */
  public getRequsetOptions(isAuth: boolean, formData: boolean): Record<string, string> {
    const commonHeaders: Record<string, string> = {
      'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization, X-Requested-With',
      'Accept': formData ? '*' : 'application/json;charset=UTF-8',
      ...(formData ? {} : {'Content-Type': 'application/json;charset=UTF-8'}),
      'Access-Control-Allow-Origin': '*',
      ...(isAuth && {
      }),
    };
    return commonHeaders;
  }
  /**
   * Get the server URL.
   * @returns {string} - The server URL.
   */
  private getServerUrl(): string {
    return environment.BaseUrl + environment.Port;
  }
  /**
   * Parse options for Angular HTTP requests.
   * @param {any} options - Options for the HTTP request.
   * @returns {any} - Parsed options for Angular HTTP.
   */
  private parseOptionsForAngularHttp(options: any): any {
    let angularOptions: any = options || {};
    if (options instanceof HttpRequest) {
      angularOptions = {
        headers: options.headers || {},
        params: options.params || {},
      };
    }
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
    return this.angularHttp.post(url, body, this.parseOptionsForAngularHttp(options));
  }
  /**
   * Make a GET request.
   * @param {string} command - The command for the GET request.
   * @param {HttpParams} queryParams - The query parameters for the GET request. Default is an empty HttpParams.
   * @param {boolean} isAuth - Whether the request requires authentication headers. Default is false.
   * @returns {Observable<any>} - Observable for the GET request.
   */
  public get(command: string, queryParams: HttpParams = new HttpParams(), isAuth = false): Observable<any> {
    const url = `${this.getServerUrl()}${command || ''}?${queryParams.toString()}`;

    return this.http.get(url, { headers: this.getRequsetOptions(isAuth,false) }).pipe(
      catchError(error => {
        console.error(`Error in GET request for ${command}:`, error);
        return throwError(() => new Error(`Failed to fetch data for ${command}. Please try again.`));
      })
    );
  }
}