import { Clasification } from "./clasification/clasification.interface";

export interface Definition {
    objectiveId: String,
    title: String,
    description: String,
    //tipos de objetivo
    clasification: Clasification,
    //quién es el responsable de cumplir? (owner)
    scope: { //polimórfico, te permite cualquier tipo de schemaId
        scopeType: 'COMPANY'| 'DEPARTMENT'| 'EMPLOYEE',
        scopeId: String
    },
}