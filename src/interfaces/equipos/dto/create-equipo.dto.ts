import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsIP, IsOptional, IsString, Min } from 'class-validator';

export class CreateEquipoDto {
    @ApiProperty({ example: '172.22.50.15' })
    @IsIP()
    ip!: string;

    @ApiProperty({ example: 'eco-server' })
    @IsString()
    nombreUsuario!: string;

    @ApiProperty({ example: 'Infraestructura' })
    @IsString()
    areaEquipo!: string;

    @ApiProperty({ example: 'SRV-Docker-01' })
    @IsString()
    nombreEquipo!: string;

    @ApiProperty({ example: 'Ubuntu Server' })
    @IsString()
    tipoEquipo!: string;

    @ApiProperty({ example: 22 })
    @IsInt()
    @Min(1)
    puerto!: number;

    @ApiProperty({ example: 'dsadfdsrwe545r5fx~##@fdsfdfs' })
    @IsString()
    contrasenia!: string;

    @ApiProperty({
        example: '2026-05-11T18:30:00.000Z',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    fechaRegistro?: string;
}
