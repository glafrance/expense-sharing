import { HttpErrorResponse } from '@angular/common/http';
import { ExpenseModel } from './model/ExpenseModel';

export class Util {
    static getAmount(amount) {
        if (typeof amount === "string") {
            amount = parseFloat(amount);
        }
        return amount.toFixed(2);
    }    

    static getTotalExpenses(expenses: ExpenseModel[]) {
        let totalExpenses = expenses.reduce((accumulator, currentExpense) => {
            return accumulator + currentExpense.amount;
        }, 0);
        return totalExpenses;
    }

    static sortDifferences(a, b) {
        if (a.amount < b.amount) return -1;
        if (a.amount > b.amount) return 1;
        if (a.mount === b.amount) return 0;
    }
}
