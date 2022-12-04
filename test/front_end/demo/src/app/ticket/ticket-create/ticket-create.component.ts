import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {TicketService} from "../../service/ticket.service";
import {GarageService} from "../../service/garage.service";
import {Garage} from "../../../model/garage";
import {Ticket} from "../../../model/ticket";
import {Router} from "@angular/router";

export const checkQuantity: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const quantityTicket = control.get("quantity").value;
  if (quantityTicket <= 0 && quantityTicket != null) {
    return {"checkQuantity": true};
  } else {
    return null;
  }
}

export const checkPrice: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const priceTicket = control.get("price").value;

  if (priceTicket <= 0 && priceTicket != null) {
    return {"checkPrice": true};
  } else {
    return null;
  }
}
export const checkDayFrom: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dayFrom = new Date(control.get('dayFrom').value)
  const dayNow = new Date();
  if (dayFrom < dayNow) {
    return {"checkDayFrom": true};
  } else {
    return null;
  }
}
export const checkLocalTo: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const localTo = control.get('localTo').value;
  const localFrom = control.get('localFrom').value;
  if (localTo === localFrom) {
    return {"checkLocalTo": true};
  } else {
    return null;
  }
}


@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  rfTicket: FormGroup;
  garageList: Garage[] | undefined;
  ticketList: Ticket[] | undefined;
  ticketCreate: Ticket | undefined;
  errors: string[];

  constructor(private _formBuilder: FormBuilder,
              private _ticketService: TicketService,
              private _garageService: GarageService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._garageService.getListGarage().subscribe(
      garageData => {
        this.garageList = garageData;
        this._ticketService.getListTicket().subscribe(
          data => {
            this.ticketList = data;
            this.rfTicket = this._formBuilder.group({
              id: [],
              status: [1],
              localFrom: ['',
                [Validators.required,
                  Validators.pattern('^[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*(?: [A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*)*$')
                ]
              ],
              localTo: ['',
                [Validators.required,
                  Validators.pattern('^[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*(?: [A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ](?:\'[A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ])*[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*)*$')
                ]],
              garage: ['', [Validators.required]],
              dayFrom: ['', [Validators.required]],
              hourFrom: ['', [Validators.required]],
              quantity: [, [Validators.required]],
              price: [, [Validators.required]]
            }, {validators: [checkPrice, checkQuantity, checkDayFrom, checkLocalTo, this.checkMatch]});
          });
      });
  }

  onSubmit() {
    console.log(this.rfTicket.value);
    this._ticketService.add(this.rfTicket.value).subscribe(
      data => {
        this.ticketCreate = data;
        this._ticketService.setMessage('Add New Ticket Go From ' + this.ticketCreate.localFrom + ' To ' + this.ticketCreate.localTo + ' Success!');
        this._router.navigateByUrl("");
      }, error => {
        this.ticketCreate = error.message;
        console.log(this.ticketCreate);
      }
    )
  }

  checkMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const localFrom = control.get('localFrom').value;
    const localTo = control.get('localTo').value;
    const garageId = control.get('garage').value.id;
    let result = null;
    this.ticketList.filter(value => {
      if (localFrom === value.localFrom && localTo === value.localTo && garageId === value.garage.id) {
        result = {"checkMatch": true};
      }
    })
    return result;
  }
}
