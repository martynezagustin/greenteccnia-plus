export interface Expense {
    _id: string,
    concept: string,
    amount: number,
    paymentMethod: string,
    date: Date,
    formattedDate: String,
    type: 'expense',
    editableItemId: string | null
}