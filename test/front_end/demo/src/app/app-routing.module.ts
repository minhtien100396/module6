import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TicketListComponent} from "./ticket/ticket-list/ticket-list.component";
import {TicketCreateComponent} from "./ticket/ticket-create/ticket-create.component";
import {TicketEditComponent} from "./ticket/ticket-edit/ticket-edit.component";


const routes: Routes = [
  {path: '', component: TicketListComponent},
  {path: 'create', component: TicketCreateComponent},
  {path: 'edit/:id', component: TicketEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
