import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from 'nest-knexjs'
import { Knex } from 'knex'

import { CreateUserDto } from './dto/create-user.dto'
import { onCreateUser } from 'utils/onCreateUser'

const Web3Token = require('web3-cardano-token/dist/node')

@Injectable()
export class UsersService {
    constructor(@InjectModel() private readonly knex: Knex) { }

    async getUser(id: string): Promise<any> {
        const [user] = await this.knex.table('users')
            .where({ id })
            .select('image_url')

        if (!user) {
            throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND)
        }

        return user
    }

    // TODO - need a policy for updating nonce at some point!
    async getNonce(address: string): Promise<any> {
        const [nonce] = await this.knex.table('users')
            .where({ id: address })
            .pluck('nonce')
        if (!nonce) {
            return HttpStatus.NOT_FOUND
        }
        return nonce
    }

    async createUser(id: CreateUserDto): Promise<any> {
        const createdUser = await onCreateUser(this.knex, id.address)
        return createdUser
    }

    async validateToken(token: string, address: string): Promise<any> {
        try {
            const { address: addressInsideToken, body: { nonce } } = await Web3Token.verify(token);
            if (addressInsideToken === address) {
                // The address we got from verifying the token was the same as the address that was passed in, it means the user is verified.
                const [user] = await this.knex.table('users')
                    .where({ id: addressInsideToken, nonce })
                    .select('*')
                return user
            }
        } catch (error) {
            console.log(error)
        }
        return null
    }
}
