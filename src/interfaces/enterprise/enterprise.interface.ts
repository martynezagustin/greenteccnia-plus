export interface Enterprise {
    _id: string,
    userId: string,
    nameEnterprise: string,
    address: string,
    description: string,
    taxIdentificationNumber: {
        number: string,
        type: "NIF" | "CUIL" | "CUIT"
    }
    city: string,
    stateOrProvince: string,
    country: string,
    companySize: "1-10" | "11-50" | "51-100" | "Más de 100",
    businessSector: "Agrícola y agroindustria" |
    "Servicio de comidas" |
    "Tecnología de la información" |
    "Transporte y logística" |
    "Educación y capacitación" |
    "Construcción e infraestructura" |
    "Turismo y ocio" |
    "Retail y comercio" |
    "Salud" |
    "Servicios financieros o legales" |
    "Energías renovables" |
    "Cosmética y belleza" |
    "Otros",
    businessType: "Startup" |
    "PyME" |
    "Proyecto Personal" |
    "Sociedad Anónima (S.A)" |
    "Sociedad de Responsabilidad Limitada (S.R.L)" |
    "Empresa de triple impacto" |
    "Pequeño emprendimiento sustentable",
    currency: "ARS" | "JOD" | "KWD" | "GBP" | "USD" | "EUR" | "CHF" | "JPY" | "CAD" | "CNY" | "AUD" | "MXN" | "BRL",
    finances: string,
    projects: string[],
    RRHH: string,
    suppliers: string[],
    clients: string[],
    technology: string,
    inventary: string[],
    providers: string[],
    requests: string[],
    sustainable: string,
    status: boolean
}