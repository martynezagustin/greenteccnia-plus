import { Survey } from "./survey/survey.interface"
import { SurveyHistory } from "./surveyHistory/surveyHistory.interface"

export interface SurveyGreen {
    surveyHistory: SurveyHistory,
    lastSurvey: {
        lastSurvey: Survey,
        growth: number
    },
    mostScoredSurvey: number,
    lowestScoredSurvey: number,
    averageScore: number,
    commonMoods: {_id: string, count: number, color: string}[],
    surveysCurrentWeek: Survey[],
    surveysCurrentMonth: Survey[],
    surveysCurrentYear: Survey[]
}