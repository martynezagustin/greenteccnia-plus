export interface Passive {
    _id: string,
    category: string,
    typeAccount: string,
    date: Date,
    formattedDate: String,
    amount: number,
    details: string,
    type: 'passive',
    editableItemId: string | null
}