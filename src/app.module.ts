import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './interfaces/auth/auth.module';
import { EquiposModule } from './interfaces/equipos/equipos.module';
import { buildTypeOrmOptions } from './infrastructure/persistence/typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => buildTypeOrmOptions(config),
        }),
        AuthModule,
        EquiposModule,
    ],
})
export class AppModule { }
