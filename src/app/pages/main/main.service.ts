import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { MainApi } from "../../dev/app.config";
import { ChttpService } from "../../services/chttp.service";
import { throwError } from "rxjs";


@Injectable()

export class BillereService {

    private getCompanyInfo: string = MainApi.GetInfo;
    private submitData: string = MainApi.submit;
    constructor(private http: ChttpService) { }


      public getInfo(presentmentId: number): Observable<any> {
        const command = `${this.getCompanyInfo}${presentmentId}`;
        return this.http.get(command, new HttpParams(), true);
      }
      public SubmitReview(data: any): Observable<any> {
        return this.http.post(this.submitData, data, true).pipe(
          map(response => response),
          catchError(error => {
            console.error('Error in SubmitReview:', error.error);
            // Returning the error object directly
            return throwError(error);
          })
        );
      }
      
 
      
}