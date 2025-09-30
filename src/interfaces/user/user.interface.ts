export interface User {
    _id: String,
    enterprise: String,
    name: String,
    lastname: String,
    email: String,
    age: Number,
    gender: "Masculino" | "Femenino" | "No binario" | "Otro" | "Prefiero no decir",
    address: String,
    identityCard: String,
    position: "Administrador" |
    "CEO" |
    "Director financiero" |
    "Director tecnológico" |
    "Director de Recursos Humanos" |
    "Abogado" |
    "Contador" |
    "Miembro del equipo" |
    "Líder departamental" |
    "Empleado" |
    'Auxiliar',
    phone: String,
    subscriptionPlan: "Gratis" |
    "Básica" |
    "Estándar" |
    "Premium",
    username: String,
    security: {
        password: String,
        twoFA: {
            twoFAActived: Boolean
            twoFACode: String,
            twoFAExpires: Date,
            pendingTwoFA: Boolean
        }
    }
}