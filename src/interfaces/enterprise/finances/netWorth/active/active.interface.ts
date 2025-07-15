export interface Active {
    _id: string,
    category: string,
    typeAccount: string,
    date: Date,
    formattedDate: String,
    amount: number,
    details: string,
    type: 'active',
    editableItemId: string | null
}