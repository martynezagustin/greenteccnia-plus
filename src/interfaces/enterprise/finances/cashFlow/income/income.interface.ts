export interface Income{
    _id: string,
    concept: string,
    amount: number,
    paymentMethod: string,
    date: Date,
    formattedDate: String,
    type: 'income',
        editableItemId: string | null
}