import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Equipo, NewEquipo } from '../../domain/equipos/equipo';
import { EQUIPOS_REPOSITORY, EquiposRepository } from '../../domain/equipos/equipos.repository';
import { CRYPTO_SERVICE, CryptoService } from '../../domain/shared/crypto.service';

export type CreateEquipoInput = {
    ip: string;
    nombreUsuario: string;
    areaEquipo: string;
    nombreEquipo: string;
    tipoEquipo: string;
    puerto: number;
    contrasenia: string;
    fechaRegistro?: Date;
};

export type UpdateEquipoInput = Partial<CreateEquipoInput>;

@Injectable()
export class EquiposService {
    constructor(
        @Inject(EQUIPOS_REPOSITORY) private readonly equiposRepository: EquiposRepository,
        @Inject(CRYPTO_SERVICE) private readonly cryptoService: CryptoService,
    ) { }

    async create(input: CreateEquipoInput): Promise<Equipo> {
        const exists = await this.equiposRepository.existsByIp(input.ip);
        if (exists) {
            throw new ConflictException('IP ya registrada');
        }
        const encrypted = await this.cryptoService.encrypt(input.contrasenia);
        const equipo: NewEquipo = {
            ip: input.ip,
            nombreUsuario: input.nombreUsuario,
            areaEquipo: input.areaEquipo,
            nombreEquipo: input.nombreEquipo,
            tipoEquipo: input.tipoEquipo,
            puerto: input.puerto,
            contrasenia: encrypted,
            fechaRegistro: input.fechaRegistro ?? new Date(),
        };
        return this.equiposRepository.create(equipo);
    }

    async findAll(): Promise<Equipo[]> {
        return this.equiposRepository.findAll();
    }

    async findByIp(ip: string): Promise<Equipo> {
        const equipo = await this.equiposRepository.findByIp(ip);
        if (!equipo) {
            throw new NotFoundException('Equipo no encontrado');
        }
        return equipo;
    }

    async findCredencialesByIp(ip: string): Promise<Equipo> {
        return this.findByIp(ip);
    }

    async update(id: number, input: UpdateEquipoInput): Promise<Equipo> {
        if (input.ip) {
            const exists = await this.equiposRepository.existsByIp(input.ip, id);
            if (exists) {
                throw new ConflictException('IP ya registrada');
            }
        }

        const updateData: UpdateEquipoInput = { ...input };
        if (input.contrasenia) {
            updateData.contrasenia = await this.cryptoService.encrypt(input.contrasenia);
        }

        return this.equiposRepository.update(id, updateData);
    }

    async remove(id: number): Promise<void> {
        await this.equiposRepository.remove(id);
    }
}
