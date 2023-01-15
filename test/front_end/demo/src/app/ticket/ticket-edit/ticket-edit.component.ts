import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {GarageService} from "../../service/garage.service";
import {TicketService} from "../../service/ticket.service";
import {Garage} from "../../../model/garage";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Ticket} from "../../../model/ticket";
import {checkDayFrom, checkLocalTo, checkPrice, checkQuantity} from "../ticket-create/ticket-create.component";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {
  rfTicket: FormGroup;
  garageList: Garage[];
  ticketList: Ticket[];
  ticketId: number;
  ticket: Ticket;
  ticketEdit: Ticket;
  garageId: number;
  ticketListNew: Ticket[];

  constructor(private _formBuilder: FormBuilder,
              private _garageService: GarageService,
              private _ticketService: TicketService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._garageService.getListGarage().subscribe(
      data => {
        this.garageList = data;
        this._ticketService.getListTicket().subscribe(
          ticketData => {
            this.ticketList = ticketData;
            this._activatedRoute.params.subscribe((param: Params) => {
              this.ticketId = param['id'];
              this._ticketService.findById(this.ticketId).subscribe(
                data => {
                  this.ticket = data;
                  this.rfTicket = this._formBuilder.group({
                    id: [this.ticket.id],
                    status:[1],
                    localFrom: [this.ticket.localFrom,
                      [Validators.required,
                        Validators.pattern('^[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*(?: [A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*)*$')
                      ]
                    ],
                    localTo: [this.ticket.localTo,
                      [Validators.required,
                        Validators.pattern('^[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*(?: [A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*)*$')
                      ]],
                    garage: [this.ticket.garage.id, [Validators.required]],
                    dayFrom: [this.ticket.dayFrom, [Validators.required]],
                    hourFrom: [this.ticket.hourFrom, [Validators.required]],
                    quantity: [this.ticket.quantity, [Validators.required]],
                    price: [this.ticket.price, [Validators.required]]
                  }, {validators: [checkPrice, checkQuantity, checkDayFrom, checkLocalTo, this.checkMatch]});
                });
            });
          });
      });
  }

  onSubmit() {
    if (this.rfTicket.valid) {
      this.garageId = this.rfTicket.value.garage;
      this._garageService.findById(this.garageId).subscribe(
        garageData => {
          this.rfTicket.value.garage = garageData;
          console.log(this.rfTicket.value);
          this._ticketService.edit(this.ticketId, this.rfTicket.value).subscribe(
            data => {
              this.ticketEdit = data;
              this._ticketService.setMessage('Edit From Ticket Go From ' + this.ticket.localFrom + ' To ' + this.ticket.localTo + ' To ticket go from ' + this.ticketEdit.localFrom + ' to ' + this.ticketEdit.localTo + ' Success!');
              this._router.navigateByUrl('');
            }
          )
        }
      )
    }
  }

  checkMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const localFrom = control.get('localFrom').value;
    const localTo = control.get('localTo').value;
    const garageId = control.get('garage').value;
    const dayFrom = control.get('dayFrom').value;
    const hourFrom = control.get('hourFrom').value;
    let result = null;
    this.ticketListNew = this.ticketList.filter(value => value.id != this.ticketId);
    console.log(this.ticketListNew);
    this.ticketListNew.filter(valueNew => {
      if (localFrom == valueNew.localFrom && localTo == valueNew.localTo
        && garageId == valueNew.garage.id && dayFrom === valueNew.dayFrom && hourFrom === valueNew.hourFrom) {
        console.log('dđ')
        result = {"checkMatch": true};
      }
    })
    return result;
  }
}

