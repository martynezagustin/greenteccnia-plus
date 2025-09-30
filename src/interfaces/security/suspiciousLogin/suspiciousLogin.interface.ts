export interface SuspiciousLogin {
    _id: String,
    userId: String,
    date: Date,
    device: 'Escritorio' | 'Tablet' | 'Móvil',
    os: String,
    browser: String,
    ip: String,
    actionByUser: 'Confirmado' | 'Notificado' | 'Sospechoso'
}