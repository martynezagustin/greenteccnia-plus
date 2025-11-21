export interface Assist {
    employee: {
        name: String,
        lastname: String
    },
    employeeId: String,
    enterpriseId: String,
    observations: String,
    dateAssist: Date,
    status: String,
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