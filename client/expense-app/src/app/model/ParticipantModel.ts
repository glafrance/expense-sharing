import { ExpenseModel } from "./ExpenseModel";

export class ParticipantModel {
    constructor(
        public id: number, 
        public name: string, 
        public expenses: ExpenseModel[]
    ) {}
}
