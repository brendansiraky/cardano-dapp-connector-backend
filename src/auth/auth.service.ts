import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(token: string, address: string): Promise<any> {
        const user = await this.usersService.validateToken(token, address);
        return user
    }

    async login(user: any) {
        return {
            access_token: this.jwtService.sign({ id: user.id, nonce: user.nonce }),
        };
    }

}
