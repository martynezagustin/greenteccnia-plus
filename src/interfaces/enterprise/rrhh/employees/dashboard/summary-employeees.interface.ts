import { Employee } from "../employee.interface"
import { WorkEnvironmentSnapshot } from "../workEnvironment/workEnvironmentSnapshot.interface"
import { DepartmentGenderParity } from "./bases-summary-employees.interface"

export interface SummaryEmployees {
    totalEmployees: {
        current: number,
        growth: number
    },
    averageAntiquity: string,
    totalGender: any,
    totalDepartments: {
        department: string,
        quantity: number
    },
    totalGenderPerDepartments: { [department: string]: DepartmentGenderParity },
    topEmployeesOfSatisfaction: [{
        name: string,
        lastname: string,
        index: number
    }],
    turnoverMonth: number,
    turnoverYear: number,
    workEnvironment: {
        workEnvironmentCurrent: number,
        message: string
    },
    workEnvironmentSnapshots: [WorkEnvironmentSnapshot],
    totalAssists: {
        'on-time'?: number
        'late'?: number
        'absent'?: number
        'vacations'?: number
        'license'?: number
    },
    totalAssistsPerPunctuality: any,
    averageSatisfaction: number,
    totalEmployeesList: [Employee]
}