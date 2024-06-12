import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { MainApi } from "../../dev/app.config";
import { ChttpService } from "../../services/chttp.service";


@Injectable()

export class BillereService {

    private getCompanyInfo: string = MainApi.GetInfo;
    constructor(private http: ChttpService) { }


      public getBillerById(userId: any): Observable<any> {
        return this.http.post(this.getCompanyInfo, {userId}, true).pipe(
          map(response => response), // Assuming the response contains a data property
          catchError(error => {
            console.error('Error in fetchCustomerData:', error);
            throw new Error('Failed to fetch customer data. Please try again.');
          })
        );
      }

      public getInfo(presentmentId: number): Observable<any> {
        const command = `${this.getCompanyInfo}${presentmentId}`;
        return this.http.get(command, new HttpParams(), true);
      }
    
}