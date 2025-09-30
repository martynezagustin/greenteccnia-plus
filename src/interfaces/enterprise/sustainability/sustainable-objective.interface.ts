export interface SustainableObjective{
    _id: string,
    title: string,
    description: string,
    date: Date,
    status: "Pendiente" | "En progreso" | "Planificado" | "Completado",
    impact: 'Bajo' | 'Mediano' | 'Alto',
    relationWithODS: "1 - Fin de la pobreza" |
            "2 - Hambre cero" |
            "3 - Salud y bienestar" |
            "4 - Educación de calidad" |
            "5 - Igualdad de género" |
            "6 - Agua limpia y saneamiento" |
            "7 - Energía asequible y no contaminante" |
            "8 - Trabajo decente y crecimiento económico" |
            "9 - Industria | innovación e infraestructura" |
            "10 - Reducción de las desigualdades" |
            "11 - Ciudades y comunidades sostenibles" |
            "12 - Producción y consumo responsables" |
            "13 - Acción por el clima" |
            "14 - Vida submarina" |
            "15 - Vida de ecosistemas terrestres" |
            "16 - Paz | justicia e instituciones sólidas" |
            "17 - Alianzas para lograr los objetivos"
}