import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectModel } from 'nest-knexjs'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        @InjectModel() private readonly knex: Knex
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUser(@Request() req: { user: UserDto }) {
        return this.usersService.getUser(req.user.id)
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
