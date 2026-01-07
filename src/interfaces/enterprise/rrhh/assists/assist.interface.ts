import { Employee } from "../employees/employee.interface"

export interface Assist {
    _id: string,
    employeeId: Employee,
    enterpriseId: String,
    observations: String,
    dateAssist: Date,
    status: string,
    checkIn: Date,
    checkOut: Date,
    hoursWorked: Number,
    lateMinutes: Number,
    transportationMode: "bicycle" |
    "public-transport" |
    "on-foot" |
    "car" |
    "motorcycle" |
    "none",
    distanceKm: Number,
    fuelType: "naphta" | "diesel" | "electric" | "GNC" | "none",
    carbonFootprintForAssist: {
        value: Number,
        transport: Number,
        unit: 'kgCO₂eq'
    },
    punctualityStatus: 'PUNTUAL' | 'TARDE' | 'MUY TARDE',
    surveyId: String
}