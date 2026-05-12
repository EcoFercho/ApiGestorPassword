import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/auth/auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('autenticacion')
@Controller('autenticacion')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('iniciar-sesion')
    @HttpCode(200)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.email, dto.password);
    }
}
