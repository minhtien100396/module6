import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {GarageService} from "../../service/garage.service";
import {Ticket} from "../../../model/ticket";
import {Garage} from "../../../model/garage";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  ticketList: Ticket[] | undefined;
  garageList: Garage[] | undefined;
  p: number = 1;
  count: number = 3;
  message: string | undefined;
  ticket: Ticket | undefined;
  ticketDetail: Ticket | undefined;
  rfSearch: FormGroup;
  dayFromFrom: string = '';
  dayFromTo: string = '';
  ticketOrder: Ticket;

  constructor(private _ticketService: TicketService,
              private _garageService: GarageService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._garageService.getListGarage().subscribe(
      garageData => {
        this.garageList = garageData;
        this._ticketService.getListTicket().subscribe(
          ticketData => {
            this.ticketList = ticketData;
            this.rfSearch = this._formBuilder.group(
              {
                localFrom: [''],
                localTo: [''],
                dayFromFrom: [''],
                dayFromTo: [''],
                garage: ['']
              });
            this.message = this._ticketService.message;
          });
      });


  }

  getTicket(idTicket: number) {
    this._ticketService.findById(idTicket).subscribe(
      data => {
        this.ticket = data;
        console.log(this.ticket);
      }
    )
  }

  onDelete() {
    this._ticketService.delete(this.ticket.id).subscribe(
      data => {
        this._ticketService.setMessage('Delete ticket go from ' + this.ticket.localFrom + ' to '
          + this.ticket.localTo + ' in ' + this.ticket.hourFrom + ' hour of day ' + this.ticket.dayFrom + ' success!');
        this.ngOnInit();
      });
  }

  sendToDetailModal(id: number) {
    this._ticketService.findById(id).subscribe(
      data => {
        this.ticketDetail = data;
      }
    )
  }

  onSearch() {
    console.log(this.rfSearch.value);
    this._ticketService.search(this.rfSearch.value).subscribe(
      data => {
        this.ticketList = data;
        console.log(this.ticketList);
      });
  }

  onOrder() {
    this._ticketService.findById(this.ticket.id).subscribe(
      data => {
        this.ticketOrder = data;
        if (this.ticketOrder.quantity <= 0) {
          this._ticketService.setMessage('Tickets sold out. Please choose another garage');
          this.ngOnInit();
        } else {
          this.ticketOrder.quantity = this.ticketOrder.quantity - 1;
          this._ticketService.edit(this.ticketOrder.id, this.ticketOrder).subscribe(
            data => {
              this._ticketService.setMessage('You have successfully order your ticket. Thank you for choosing our service');
              this.ngOnInit();
            }
          )
        }
      }
    )
  }
}
