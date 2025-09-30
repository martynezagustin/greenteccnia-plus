export interface LogUser {
    userId: String,
    event: String,
    details: String,
    date: Date,
    clasificationSecurity: "Normal" | "Advertencia" | "Error" | "Crítico"
}