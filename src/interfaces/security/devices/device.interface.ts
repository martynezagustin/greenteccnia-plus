export interface Device {
    _id: String;
    userId: String,
    deviceType: "Escritorio" | "Tablet" | "Móvil", //puede ser el tipo de dispositivo, movil? compu?
    os: String, //el nombre del dispositivo,
    browser: String,
    ip: String,
    lastLogin: Date,
    isTrusted: Boolean
} 