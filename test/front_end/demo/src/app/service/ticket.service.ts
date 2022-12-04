import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../../model/ticket";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  message: string;

  constructor(private _httpClient: HttpClient) {
  }

  getListTicket(): Observable<Ticket[]> {
    return this._httpClient.get<Ticket[]>(environment.API_URL_TICKET);
  }

  add(ticket: Ticket): Observable<Ticket> {
    return this._httpClient.post<Ticket>(environment.API_URL_TICKET, ticket);
  }

  setMessage(message: string) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  findById(idTicket: number): Observable<Ticket> {
    return this._httpClient.get<Ticket>(environment.API_URL_TICKET + '/' + idTicket);
  }

  delete(idTicket: number): Observable<Ticket> {
    return this._httpClient.delete<Ticket>(environment.API_URL_TICKET + '/' + idTicket);
  }


  edit(id: number, ticket: any): Observable<Ticket> {
    return this._httpClient.put<Ticket>(environment.API_URL_TICKET + '/' + id, ticket);
  }

  search(rfSearch: any): Observable<Ticket[]> {

    if (!rfSearch.dayFromFrom && !rfSearch.dayFromTo) {
      console.log('1')
      return this._httpClient.get<Ticket[]>(
        environment.API_URL_TICKET +
        '/searchNotDay?localFrom=' + rfSearch.localFrom +
        '&localTo=' + rfSearch.localTo +
        '&garageId=' + rfSearch.garage);
    }
    if (!rfSearch.dayFromFrom) {
      console.log('2')
      return this._httpClient.get<Ticket[]>(
        environment.API_URL_TICKET +
        '/searchNotDayFrom?localFrom=' + rfSearch.localFrom +
        '&localTo=' + rfSearch.localTo +
        '&garageId=' + rfSearch.garage +
        '&dayFromTo=' + rfSearch.dayFromTo);
    }
    if (!rfSearch.dayFromTo) {
      console.log('3')
      return this._httpClient.get<Ticket[]>(
        environment.API_URL_TICKET +
        '/searchNotDayFromTo?localFrom=' + rfSearch.localFrom +
        '&localTo=' + rfSearch.localTo +
        '&garageId=' + rfSearch.garage +
        '&dayFromFrom=' + rfSearch.dayFromFrom);
    }

    console.log("4")
    return this._httpClient.get<Ticket[]>(
      environment.API_URL_TICKET +
      '/search?localFrom=' + rfSearch.localFrom +
      '&localTo=' + rfSearch.localTo +
      '&garageId=' + rfSearch.garage +
      '&dayFromFrom=' + rfSearch.dayFromFrom +
      '&dayFromTo=' + rfSearch.dayFromTo);
  }
}
