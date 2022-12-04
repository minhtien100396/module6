import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Garage} from "../../model/garage";
import {environment} from "../../environments/environment";
import {Ticket} from "../../model/ticket";

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  constructor(private _httpClient: HttpClient) {
  }

  getListGarage(): Observable<Garage[]> {
    return this._httpClient.get<Garage[]>(environment.API_URL_GARAGE);
  }

  findById(id: number): Observable<Garage> {
    return this._httpClient.get<Garage>(environment.API_URL_GARAGE + '/' + id);
  }
}
