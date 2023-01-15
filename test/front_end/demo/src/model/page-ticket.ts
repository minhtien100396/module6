import {Ticket} from "./ticket";


export interface PageTicket {
  content: Ticket[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    unpaged: boolean,
    paged: boolean
  },
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort:
    {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
  numberOfElements: number,
  first: boolean,
  empty: boolean
}
