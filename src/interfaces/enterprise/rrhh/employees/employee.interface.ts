import { Assist } from "../assists/assist.interface"
import { PunctualityHistory } from "./punctuality/punctuality.interface"

export interface Employee {
    _id: string,
    enterpriseId: string,
    userId: string,
    personalInfo: {
        name: string,
        lastname: string,
        gender: 'Masculino' | 'Femenino' | 'No binario' | 'Otro' | 'Prefiero no decir',
        identityCard: {
            value: number,
            type: 'DNI' | 'Pasaporte' | 'Cédula de identidad' | 'Otro'
        },
        address: string,
        phone: string,
        email: string,
        dateOfBirthday: Date
    },
    punctualityHistory: PunctualityHistory,
    generalPunctualityIndex: Number,
    jobInfo: {
        contractStartDate: Date,
        leavingDate: Date,
        position: string,
        status: 'Presencial' | 'Remoto' | 'Híbrido',
        department: {
          id: string,
          name: string  
        },
        contractType: 'Contrato de trabajo a plazo fijo' | 'Contrato de trabajo a tiempo parcial' | 'Contrato de trabajo de temporada' | 'Contrato de trabajo eventual' | 'Contrato de trabajo de grupo o por equipo'
        CCT: {
            id: string,
            name: string,
            cctNumber: string
        },
        ART: {
            id: string,
            name: string,
            cuit: string,
        },
        expectedCheckInTime: string,
        syndicate: {
            id: string,
            name: string
        },
    },
    financialInformation: {
        grossSalary: number,
        bank: string,
        cbu: number
    },
    assists: Assist[],
    verifyData: boolean,
    privacityData: boolean
}