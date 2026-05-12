import { Equipo, NewEquipo } from './equipo';

export const EQUIPOS_REPOSITORY = 'EQUIPOS_REPOSITORY';

export interface EquiposRepository {
    create(equipo: NewEquipo): Promise<Equipo>;
    findAll(): Promise<Equipo[]>;
    findByIp(ip: string): Promise<Equipo | null>;
    findById(id: number): Promise<Equipo | null>;
    update(id: number, equipo: Partial<Equipo>): Promise<Equipo>;
    remove(id: number): Promise<void>;
    existsByIp(ip: string, excludeId?: number): Promise<boolean>;
}
