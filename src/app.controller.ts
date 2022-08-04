import { Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService,
        @InjectModel() private readonly knex: Knex
    ) { }
    
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const [user] = await this.knex.table('users')
            .where({ id: req.user.id })
        if (!user) {
            throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND)
        }
        return req.user;
    }

    @Get('')
    async helloWorld() {
        console.log('this is being called')
        const user = await this.knex.table('users')
            .select('*')
        console.log(user)
        return user
    }
}
