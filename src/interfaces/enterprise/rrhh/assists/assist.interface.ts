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
    transportationMode: 'Bicicleta' | 'Transporte público' | 'Caminata' | 'Automóvil' | 'Motocicleta' | 'No aplica',
    distanceKm: Number,
    fuelType: 'Nafta' | 'Diesel' | 'Eléctrico' | 'Gas Natural Comprimido' | 'No aplica',
    carbonFootprintForAssist: {
        value: Number,
        transport: Number,
        unit: 'kgCO₂eq'
    },
    punctualityStatus: 'PUNTUAL' | 'TARDE' | 'MUY TARDE',
    surveyId: String
}