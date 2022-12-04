import {Garage} from "./garage";

export interface Ticket {
  id?: number,
  price: number,
  localFrom: string,
  localTo: string,
  dayFrom: string,
  hourFrom: string,
  garage?: Garage,
  quantity: number,
  status: number
}
