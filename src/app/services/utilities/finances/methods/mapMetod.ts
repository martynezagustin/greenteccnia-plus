export const mappingMethod = (activeService: any, passiveService: any, incomeService: any, expenseService: any) => {
    return {
        diary: {
            active: activeService.getActivesByCompositionCategoryPerPeriod.bind(activeService),
            passive: passiveService.getLiabilitiesByCompositionCategoryPerPeriod.bind(passiveService),
            income: incomeService.getIncomesByCompositionCategoryPerPeriod.bind(incomeService),
            expense: expenseService.getExpensesByCompositionCategoryPerPeriod.bind(expenseService),
            label: 'day'
        },
        monthly: {
            active: activeService.getActivesByCompositionCategoryPerPeriod.bind(activeService),
            passive: passiveService.getLiabilitiesByCompositionCategoryPerPeriod.bind(passiveService),
            income: incomeService.getIncomesByCompositionCategoryPerPeriod.bind(incomeService),
            expense: expenseService.getExpensesByCompositionCategoryPerPeriod.bind(expenseService),
            label: 'month'
        },
        annual: {
            active: activeService.getActivesByCompositionCategoryPerPeriod.bind(activeService),
            passive: passiveService.getLiabilitiesByCompositionCategoryPerPeriod.bind(passiveService),
            income: incomeService.getIncomesByCompositionCategoryPerPeriod.bind(incomeService),
            expense: expenseService.getExpensesByCompositionCategoryPerPeriod.bind(expenseService),
            label: 'year'
        },
        trimester: {
            active: activeService.getActivesByCompositionCategoryPerPeriod.bind(activeService),
            passive: passiveService.getLiabilitiesByCompositionCategoryPerPeriod.bind(passiveService),
            label: 'trimester'
        },
        total: {
            active: activeService.getActivesByCompositionCategory.bind(activeService),
            passive: passiveService.getLiabilitiesByCompositionCategory.bind(passiveService),
            income: incomeService.getIncomesByCompositionCategory.bind(incomeService),
            expense: expenseService.getExpensesByCompositionCategory.bind(expenseService)
        }
    }
}