import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './interface/User.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUser(@Request() req: { user: User }) {
        return this.usersService.getProfile(req.user.id)
    }

    @Get(':address')
    getNonce(@Param('address') address: string) {
        return this.usersService.getNonce(address)
    }

    @Post()
    createUser(@Body() id: CreateUserDto) {
        return this.usersService.createUser(id)
    }
}
