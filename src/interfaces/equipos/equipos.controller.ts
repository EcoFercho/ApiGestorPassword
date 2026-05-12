import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EquiposService } from '../../application/equipos/equipos.service';
import { Equipo } from '../../domain/equipos/equipo';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { EquipoCredencialesResponseDto } from './dto/equipo-credenciales-response.dto';
import { EquipoResponseDto } from './dto/equipo-response.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@ApiTags('equipos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class EquiposController {
    constructor(private readonly equiposService: EquiposService) { }

    @Get('equipos/all')
    async findAll(): Promise<EquipoResponseDto[]> {
        const equipos = await this.equiposService.findAll();
        return equipos.map((equipo) => this.toResponse(equipo));
    }

    @Post('equipos')
    async create(@Body() dto: CreateEquipoDto): Promise<EquipoResponseDto> {
        const equipo = await this.equiposService.create(this.toCreateInput(dto));
        return this.toResponse(equipo);
    }

    @Get('equipo/:ip')
    async findByIp(@Param('ip') ip: string): Promise<EquipoResponseDto> {
        const equipo = await this.equiposService.findByIp(ip);
        return this.toResponse(equipo);
    }

    @Get('equipoCredenciales/:ip')
    async findCredenciales(
        @Param('ip') ip: string,
    ): Promise<EquipoCredencialesResponseDto> {
        const equipo = await this.equiposService.findCredencialesByIp(ip);
        return this.toCredencialesResponse(equipo);
    }

    @Delete('equipos/:id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.equiposService.remove(id);
    }

    @Put('equipos/editarEquipo/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateEquipoDto,
    ): Promise<EquipoResponseDto> {
        const equipo = await this.equiposService.update(id, this.toUpdateInput(dto));
        return this.toResponse(equipo);
    }

    private toCreateInput(dto: CreateEquipoDto) {
        return {
            ...dto,
            fechaRegistro: dto.fechaRegistro ? new Date(dto.fechaRegistro) : undefined,
        };
    }

    private toUpdateInput(dto: UpdateEquipoDto) {
        return {
            ...dto,
            fechaRegistro: dto.fechaRegistro ? new Date(dto.fechaRegistro) : undefined,
        };
    }

    private toResponse(equipo: Equipo): EquipoResponseDto {
        return { ...equipo };
    }

    private toCredencialesResponse(
        equipo: Equipo,
    ): EquipoCredencialesResponseDto {
        return {
            id: equipo.id,
            ip: equipo.ip,
            nombreUsuario: equipo.nombreUsuario,
            tipoEquipo: equipo.tipoEquipo,
            puerto: equipo.puerto,
            contrasenia: equipo.contrasenia,
        };
    }
}
