export interface DashboardObjectivesData {
    metrics: [],
    composition: number[],
    objectives: [],
    evolutionStatusObjectives: {},
    overallProgress: {
        evolutionOverallProgress: any[], 
        actualProgress: {
            value: number,
            bgColor: string,
            color: string
        }
    },
    lastObjective: {
        evolutionLastObjectiveAggregated: any[],
        actualProgress: number,
        color: string
    }
}