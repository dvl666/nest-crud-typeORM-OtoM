import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { RequestWithUser } from 'src/users/interfaces/request.with.user';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ) {
        console.log(registerDto)
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    profile(
        @Req()
        req: Request & RequestWithUser
    ){
        return this.authService.profile(req.user);
    }
    
}
