import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/interface/User.interface';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService
    ) { }
    
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: { user: User }) {
        return this.authService.login(req.user)
    }
}
