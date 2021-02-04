import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from "./constants";
import { ExpenseModel } from './model/ExpenseModel';
import { ParticipantModel } from './model/ParticipantModel';

@Injectable()
export class ExpenseSharingService {
    participants: ParticipantModel[] = [];
    // participants: ParticipantModel[] = testData;
    @Output() updatedParticipants = new EventEmitter<void>();

    constructor(private http: HttpClient) {}

    getParticipants(): ParticipantModel[] {
        return this.participants.slice();
    }

    addParticipant(participant: ParticipantModel) {
        this.saveParticipant(participant).subscribe((response) => {
            this.participants.push(response);
            this.updatedParticipants.emit();
        });
    }

    saveParticipant(participant: ParticipantModel): Observable<ParticipantModel> {
        return this.http.post<ParticipantModel>(Constants.URLS.SAVE_PARTICIPANT, participant)
    }
}

// Test data
const testData = [
    new ParticipantModel(1, "Tom Boders", [
        new ExpenseModel("food", 50.00),
        new ExpenseModel("gas", 25.00),
        new ExpenseModel("hotel", 125.00)
    ]),
    new ParticipantModel(2, "Mary Smith", [
        new ExpenseModel("drinks", 75.00),
        new ExpenseModel("movies", 50.00)
    ]),
    new ParticipantModel(3, "Sam Suede", [
        new ExpenseModel("ski rentals", 150.00),
        new ExpenseModel("snacks", 15.00),
        new ExpenseModel("gas", 25.00)
    ]),
    new ParticipantModel(4, "Mike Mashst", [
        new ExpenseModel("toll fees", 20.00),
        new ExpenseModel("coffee", 15.00),
        new ExpenseModel("snacks", 12.00)
    ])
];