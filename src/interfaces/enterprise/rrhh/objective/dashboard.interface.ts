import { RRHHTask } from "./task/task.interface"

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
    },
    lastObjectiveInfo: {
        title: String,
        description: String,
        startDate: Date,
        endDate: Date,
        classification: String,
        checklist: RRHHTask[],
        status: String,
        progress: Number,
        priority: String,
    },
    mostUsedClassifications: String
}