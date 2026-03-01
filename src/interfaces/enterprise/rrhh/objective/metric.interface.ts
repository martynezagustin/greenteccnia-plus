export interface Metric {
    objectiveId: String,
    //el campo este se activa si no es binario
    metricType: 'KPI' | 'BINARY' | 'PROGRESS' | 'INTEGRATED',
    metricCustomName: String, //pq si es CUSTOM, es el nombre que quieras
    kpi: {
        unit: '$' | 'kWh' | '%' | 'CUSTOM', //puede ser $, moneda, kilowats, lo que se te antoje
        initialValue: Number, //con qué valor iniciaste
        targetValue: Number, // con qué valor deseas terminar
        currentValue: Number, //con qué valor vas ahora
        polarity: 'POSITIVE' | 'NEGATIVE', // es MUY importante: querés disminuir ese valor porque es el objetivo o aumentarlo?
        thresholds: {
            warning: Number,
            critical: Number
        }
    },
    progress: {
        taskProgress: Number,
        kpiProgress: Number, //el ejemplo de los 200mil pesos 😉
        score: Number
    },
    integration: String,
    evaluationRules: [String],
    SMARTConditions: String,
}