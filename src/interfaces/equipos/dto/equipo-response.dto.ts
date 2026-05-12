import { ApiProperty } from '@nestjs/swagger';

export class EquipoResponseDto {
    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: '172.22.50.15' })
    ip!: string;

    @ApiProperty({ example: 'eco-server' })
    nombreUsuario!: string;

    @ApiProperty({ example: 'Infraestructura' })
    areaEquipo!: string;

    @ApiProperty({ example: 'SRV-Docker-01' })
    nombreEquipo!: string;

    @ApiProperty({ example: 'Ubuntu Server' })
    tipoEquipo!: string;

    @ApiProperty({ example: 22 })
    puerto!: number;

    @ApiProperty({ example: 'v1:iv:tag:data' })
    contrasenia!: string;

    @ApiProperty({ example: '2026-05-11T18:30:00.000Z' })
    fechaRegistro!: Date;
}
