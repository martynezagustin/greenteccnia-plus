export interface GenderParity{
    [gender: string] : number
}
export interface DepartmentGenderParity {
  totalEmployees: number;
  parity: {
    [gender: string]: number; // ej: { male: 10, female: 5, nonBinary: 2 }
  };
}

export interface DepartmentDistribution {
    department: string,
    quantity: number
}
export interface TopEmployeesSatisfaction{
    name: string,
    lastname: string,
    index: number
}