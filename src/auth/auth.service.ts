import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    // async register(registerDto: RegisterDto) {
    async register({ name, email, password }: RegisterDto) { //Desestructurar un objeto

        // const user = await this.userService.findOneByEmail(registerDto.email)
        const user = await this.userService.findOneByEmail( email )


        if(user) throw new BadRequestException('User already exists');

        // return await this.userService.create({
        //     registerDto.name,
        //     registerDto.email,
        //     registerDto.password: await bcryptjs.hash(registerDto.password, 12)
        // }) NO SIRVE
        
        return await this.userService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 10)
        })
        
    }

    async login({ email, password }: LoginDto) {

        const user = await this.userService.findOneByEmail(email);

        if(!user) throw new UnauthorizedException('email is wrong');

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        
        if(!isPasswordValid) throw new UnauthorizedException('password is wrong');

        const payload = { email: user.email };

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            email
        };

    }

}
