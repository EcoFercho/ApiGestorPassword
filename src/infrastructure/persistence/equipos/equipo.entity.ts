import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'equipos' })
@Unique(['ip'])
export class EquipoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 64 })
    ip!: string;

    @Column({ length: 100 })
    nombreUsuario!: string;

    @Column({ length: 100 })
    areaEquipo!: string;

    @Column({ length: 120 })
    nombreEquipo!: string;

    @Column({ length: 120 })
    tipoEquipo!: string;

    @Column({ type: 'int' })
    puerto!: number;

    @Column({ type: 'text' })
    contrasenia!: string;

    @Column({ type: 'timestamptz' })
    fechaRegistro!: Date;
}
