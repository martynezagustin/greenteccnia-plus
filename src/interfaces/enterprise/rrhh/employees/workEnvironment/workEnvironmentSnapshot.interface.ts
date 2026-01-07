export interface WorkEnvironmentSnapshot{
    _id: string,
    enterpriseId: string,
    year: number,
    month: number,
    workEnvironmentScore: number,
    weights: {
        satisfaction: number,
        workEnvironments: number,
        turnover: number,
        absentism: number,
        antiquity: number
    },
    createdAt: Date
}