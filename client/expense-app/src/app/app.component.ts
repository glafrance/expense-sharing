import { Component, OnInit } from '@angular/core';

import { ExpenseSharingService } from "./expense-sharing.service";
import { ParticipantModel } from './model/ParticipantModel';
import { Util } from "./util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  totalExpenses: number = 0;
  averageExpenses: number = 0;
  participants: ParticipantModel[];
  showAdd: boolean = false;
  fairShares: string[] = [];

  constructor(private expenseSharingService: ExpenseSharingService) {}

  ngOnInit() {
    const self = this;
    this.participants = this.expenseSharingService.getParticipants();
    this.expenseSharingService.updatedParticipants.subscribe(() => {
      this.newParticipantAdded(); }
    );

    if (this.participants.length > 0) {
      this.calculateTotalExpenses();
    }
  }

  showAddParticipant() {
    this.showAdd = true;
  }

  newParticipantAdded() {
    this.participants = this.expenseSharingService.getParticipants();
    this.fairShares = [];
    this.calculateTotalExpenses();
  }

  calculateTotalExpenses() {
    this.totalExpenses = 0;
    let expenses = 0;

    for (let participant of this.participants) {
      for (let expense of participant.expenses) {
        expenses += expense.amount;
      }
    }

    this.totalExpenses = Util.getAmount(expenses);
    this.averageExpenses = Util.getAmount(this.totalExpenses / this.participants.length); 
  }

  calculateFairShares() {
    const amountPerPerson = this.totalExpenses / this.participants.length;

    const overpaidUnderpaid = [];
    let needFairShares = false;

    for (let participant of this.participants) {
      const amountOverpaidUnderpaid = amountPerPerson - Util.getTotalExpenses(participant.expenses);
      if (amountOverpaidUnderpaid !== 0) {
        needFairShares = true;
        overpaidUnderpaid.push([participant.name, amountOverpaidUnderpaid]);
      }
    }

    if (needFairShares) {
      overpaidUnderpaid.sort(Util.sortDifferences);
      const len = overpaidUnderpaid.length;

      for (let x = 0, y = len - 1; x < y;) {
        let paidTooLittle = overpaidUnderpaid[x];
        let paidTooMuch = overpaidUnderpaid[y];
        const difference = paidTooMuch[1] + paidTooLittle[1];

        if (difference === 0) {
          this.fairShares.push(paidTooLittle[0] + " pays " + paidTooMuch[0] + " " + Util.getAmount(Math.abs(paidTooMuch[1])));
          if (Math.abs(x-y) === 1) break;
        } else {
          if (difference > 0) {
            this.fairShares.push(paidTooLittle[0] + " pays " + paidTooMuch[0] + " " + Util.getAmount(Math.abs(paidTooMuch[1])));
            overpaidUnderpaid[x][1] += paidTooMuch[1];
            y--;
          } else {
            this.fairShares.push(paidTooLittle[0] + " pays " + paidTooMuch[0] + " " + Util.getAmount(Math.abs(paidTooLittle[1])));
            overpaidUnderpaid[y][1] += paidTooLittle[1];
            x++;
          }
        }
      }
    }    
  }
}
