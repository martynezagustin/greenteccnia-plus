export interface Bank{
    enterpriseId: string,
    name: string,
    shortName: string,
    CUIT: string,
    bicSwift: string,
    supportPhone?: string,
    supportEmail?: string,
    city: string,
    provinceOrEstate: string
}