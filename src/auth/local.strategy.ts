import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'address', passwordField: 'token', passReqToCallback: true });
    }

    async validate(req: { body: { token: string, address: string } }): Promise<any> {
        const user = await this.authService.validateUser(req.body.token, req.body.address);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}