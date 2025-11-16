export interface Survey {
    enterpriseId: String,
    employeeId: String,
    date: Date,
    relationshipWithTeam: Number,
    satisfaction: Number,
    categoryId: String,
    moodId: String,
    comments: String,
    personalFactorId: String,
    workEnvironment: String,
    surveyPeriod: 'Mensual' | 'Trimestral' | 'Anual' | 'Ad-hoc',
    totalScore: number,
    predictedMood: String,
    createdAt: Date
}