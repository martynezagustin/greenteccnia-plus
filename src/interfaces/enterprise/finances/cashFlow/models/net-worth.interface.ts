
export interface NetWorthFullData {
    total: number,
    currentMonth: number,
    currentTrimester: number,
    currentYear: number,
    percentages: {
        currentMonth: number,
        currentTrimester: number,
        currentYear: number
    }
}