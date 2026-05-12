import { ApiProperty } from '@nestjs/swagger';

export class EquipoCredencialesResponseDto {
    @ApiProperty({ example: 3 })
    id!: number;

    @ApiProperty({ example: '172.22.50.15' })
    ip!: string;

    @ApiProperty({ example: 'eco-server' })
    nombreUsuario!: string;

    @ApiProperty({ example: 'Ubuntu Server' })
    tipoEquipo!: string;

    @ApiProperty({ example: 22 })
    puerto!: number;

    @ApiProperty({
        example:
            'v1:jqV7khnFij7S1LIG:/UC5i2lsx7HavqWETwO3AQ==:tVm8GLnkeoc/lWxglWi+KHGQapJKFy7E1TI3uA==',
    })
    contrasenia!: string;
}
