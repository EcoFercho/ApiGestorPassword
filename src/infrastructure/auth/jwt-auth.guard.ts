import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const authHeader = req.headers['authorization'] || '';
        const headerValue = Array.isArray(authHeader)
            ? authHeader.join(' ')
            : authHeader;

        if (!headerValue.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token requerido');
        }

        const token = headerValue.slice(7).trim();
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.config.get<string>('JWT_SECRET'),
            });
            (req as { user?: unknown }).user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token invalido');
        }
    }
}
