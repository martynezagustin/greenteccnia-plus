import { Employee } from "../employees/employee.interface"

export interface Operative {
    objectiveId: String,
    status: 'PLANNED' |
    'IN_PROGRESS' |
    'AT_RISK' |
    'CRITICAL' |
    'PAUSED' |
    'COMPLETED' |
    'CANCELLED' |
    'EXPIRED' |
    'DRAFT',
    isStarted: Boolean, //se supone que un DISPARADOR button activa el objetivo
    riskLevel: 'GREEN' | 'YELLOW' | 'RED',
    //POR QUÉ 
    riskString: String,
    //NUEVO, SALUD DEL OBJETIVO
    health: {
        isDelayed: Boolean,
        delayDays: Number,
        lastStatusChange: Date
    },
    //hay involucrados??
    stakeholders: [Employee],
    impact: ['FINANCIAL' | 'LEGAL' | 'OPERATIONAL' | 'REPUTATIONAL' | 'ENVIRONMENTAL'],
    notifications: {
        frequency: ['DAILY'| 'WEEKLY'| 'MONTHLY'| 'CUSTOM'], //frecuencia de medición, si es diaria, semanal, mensual: cron que trabaje
        intervalValue:  Number , //si es CUSTOM, cada cuánto
    },
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
    plannedStart: Date,
    plannedEnd: Date,
    evidenceRequired: Boolean
}