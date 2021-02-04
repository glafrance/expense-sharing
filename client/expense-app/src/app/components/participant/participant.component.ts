import { Component, Input, OnInit } from "@angular/core";

import { ParticipantModel } from 'src/app/model/ParticipantModel';
import { Util } from "../../util";

@Component({
    selector: "app-participant",
    templateUrl: "./participant.component.html",
    styleUrls: ["./participant.component.css"]
})

export class ParticipantComponent implements OnInit {
    @Input() participant: ParticipantModel;
    total: number = 0;

    ngOnInit() {
        for (let expense of this.participant.expenses) {
            let amount = expense.amount;

            if (typeof amount === "string") {
                amount = parseFloat(amount);
            }
            this.total += amount;
        }
    }

    totalAmount() {
        return this.total.toFixed(2);
    }

    getAmount(amount) {
        return Util.getAmount(amount);
    }
}