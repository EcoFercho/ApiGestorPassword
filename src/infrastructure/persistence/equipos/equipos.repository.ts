import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Equipo, NewEquipo } from '../../../domain/equipos/equipo';
import { EquiposRepository } from '../../../domain/equipos/equipos.repository';
import { EquipoEntity } from './equipo.entity';

@Injectable()
export class TypeOrmEquiposRepository implements EquiposRepository {
    constructor(
        @InjectRepository(EquipoEntity) private readonly repo: Repository<EquipoEntity>,
    ) { }

    async create(equipo: NewEquipo): Promise<Equipo> {
        const entity = this.repo.create(equipo);
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }

    async findAll(): Promise<Equipo[]> {
        const entities = await this.repo.find({ order: { id: 'ASC' } });
        return entities.map((entity) => this.toDomain(entity));
    }

    async findByIp(ip: string): Promise<Equipo | null> {
        const entity = await this.repo.findOne({ where: { ip } });
        return entity ? this.toDomain(entity) : null;
    }

    async findById(id: number): Promise<Equipo | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? this.toDomain(entity) : null;
    }

    async update(id: number, equipo: Partial<Equipo>): Promise<Equipo> {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity) {
            throw new NotFoundException('Equipo no encontrado');
        }

        const updates = Object.fromEntries(
            Object.entries(equipo).filter(([, value]) => value !== undefined),
        );

        Object.assign(entity, updates);
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }

    async remove(id: number): Promise<void> {
        const result = await this.repo.delete(id);
        if (!result.affected) {
            throw new NotFoundException('Equipo no encontrado');
        }
    }

    async existsByIp(ip: string, excludeId?: number): Promise<boolean> {
        if (excludeId !== undefined) {
            return this.repo.exist({ where: { ip, id: Not(excludeId) } });
        }
        return this.repo.exist({ where: { ip } });
    }

    private toDomain(entity: EquipoEntity): Equipo {
        return {
            id: entity.id,
            ip: entity.ip,
            nombreUsuario: entity.nombreUsuario,
            areaEquipo: entity.areaEquipo,
            nombreEquipo: entity.nombreEquipo,
            tipoEquipo: entity.tipoEquipo,
            puerto: entity.puerto,
            contrasenia: entity.contrasenia,
            fechaRegistro: entity.fechaRegistro,
        };
    }
}
