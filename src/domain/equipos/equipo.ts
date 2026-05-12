export interface Equipo {
    id: number;
    ip: string;
    nombreUsuario: string;
    areaEquipo: string;
    nombreEquipo: string;
    tipoEquipo: string;
    puerto: number;
    contrasenia: string;
    fechaRegistro: Date;
}

export type NewEquipo = Omit<Equipo, 'id'>;
