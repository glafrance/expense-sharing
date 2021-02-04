import { Component, EventEmitter, Output } from "@angular/core";

import { ExpenseModel } from 'src/app/model/ExpenseModel';
import { ExpenseSharingService } from "../../expense-sharing.service";
import { ParticipantModel } from 'src/app/model/ParticipantModel';
import { Util } from "../../util";

@Component({
    selector: "app-add-participant",
    templateUrl: "./add-participant.component.html",
    styleUrls: ["./add-participant.component.css"]
})

export class AddParticipantComponent {
    nextId: number = 1;
    expenseNameValue: string = "";
    expenseAmountValue: string = "";
    @Output("newParticipant") participantAdded = new EventEmitter<ParticipantModel>();

    expenses: ExpenseModel[] = [];
    total: number = 0;

    constructor(private expenseSharingService: ExpenseSharingService) {}

    addExpense(name, amount) {
        if (typeof amount === "string") {
            amount = parseFloat(amount);
        }
        this.expenses.push(new ExpenseModel(name, amount));
        this.total += amount;
        this.expenseNameValue = "";
        this.expenseAmountValue = "";
    }

    addParticipant(participantName) {
        const participant: ParticipantModel = 
            new ParticipantModel(
                this.nextId++, 
                participantName, 
                this.expenses
            );
        this.expenseSharingService.addParticipant(participant);
        this.expenses = [];
        this.total = 0;
    }

    totalAmount() {
        return this.total.toFixed(2);
    }

    getAmount(amount) {
        return Util.getAmount(amount);
    }
}
