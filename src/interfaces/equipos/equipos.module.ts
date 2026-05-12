import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposService } from '../../application/equipos/equipos.service';
import { EQUIPOS_REPOSITORY } from '../../domain/equipos/equipos.repository';
import { CRYPTO_SERVICE } from '../../domain/shared/crypto.service';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { AesCryptoService } from '../../infrastructure/crypto/aes-crypto.service';
import { EquipoEntity } from '../../infrastructure/persistence/equipos/equipo.entity';
import { TypeOrmEquiposRepository } from '../../infrastructure/persistence/equipos/equipos.repository';
import { EquiposController } from './equipos.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EquipoEntity])],
    controllers: [EquiposController],
    providers: [
        EquiposService,
        JwtAuthGuard,
        { provide: EQUIPOS_REPOSITORY, useClass: TypeOrmEquiposRepository },
        { provide: CRYPTO_SERVICE, useClass: AesCryptoService },
    ],
})
export class EquiposModule { }
