import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const adminEmail = this.config.get<string>('ADMIN_EMAIL');
        const adminPassword = this.config.get<string>('ADMIN_PASSWORD');

        if (email !== adminEmail || password !== adminPassword) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const secret = this.config.get<string>('JWT_SECRET');
        const accessToken = await this.jwtService.signAsync(
            { sub: 'admin', email },
            { secret, expiresIn: '8h' },
        );

        return { accessToken };
    }
}
