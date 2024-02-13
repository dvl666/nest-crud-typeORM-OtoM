import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { RequestWithUser } from 'src/users/interfaces/request.with.user';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from 'src/common/enums/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';

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

    // @Get('profile')
    // @Roles(Role.USER)
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(
    //     @Req()
    //     req: Request & RequestWithUser
    // ){  
    //     console.log(req.user)
    //     return this.authService.profile(req.user);
    // }

    @Get('profile')
    @Auth(Role.USER)
    profile(
        @ActiveUser() user: UserActiveInterface
    ){  
        return this.authService.profile(user);
    }
    
}
