import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AddParticipantComponent } from "./components/add-participant/add-participant.component";
import { AppComponent } from './app.component';
import { ExpenseSharingService } from "./expense-sharing.service";
import { HeaderComponent } from "./components/header/header.component";
import { ParticipantComponent } from "./components/participant/participant.component";

@NgModule({
  declarations: [
    AddParticipantComponent,
    AppComponent,
    HeaderComponent,
    ParticipantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ExpenseSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
