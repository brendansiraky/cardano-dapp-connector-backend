import { HttpStatus, Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { nanoid } from 'nanoid'

const Web3Token = require('web3-cardano-token/dist/node')

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // TODO - need a policy for updating nonce at some point
    async getNonce(address: string): Promise<any> {

        const user = await this.userRepository.findOne({
            where: { id: address },
        })

        if (!user?.nonce) {
            return HttpStatus.NOT_FOUND
        }

        return user.nonce
    }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        const nonce = nanoid(64)

        const user = await this.userRepository.save({
            id: createUserDto.address,
            nonce
        })

        return user
    }

    async validateToken(token: string, address: string): Promise<any> {
        try {
            const { address: addressInsideToken, body: { nonce } } = await Web3Token.verify(token);
            if (addressInsideToken === address) {
                // The address we got from verifying the token was the same as the address that was passed in, it means the user is verified.
                const user = await this.userRepository.findOne({
                    where: { id: addressInsideToken, nonce }
                })

                return user
            }
        } catch (error) {
            console.log(error)
        }
        return null
    }

    async getProfile(id: string) {
        return await this.userRepository.findOne({
            where: { id }
        })
    }
}
