import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const buildTypeOrmOptions = (
    config: ConfigService,
): TypeOrmModuleOptions => {
    const url = config.get<string>('DATABASE_URL');
    if (!url) {
        throw new Error('DATABASE_URL is required');
    }

    const parsed = new URL(url);

    return {
        type: 'postgres',
        host: parsed.hostname,
        port: Number(parsed.port || 5432),
        username: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        database: parsed.pathname.replace('/', ''),
        schema: parsed.searchParams.get('schema') || undefined,
        autoLoadEntities: true,
        synchronize: true,
    };
};
