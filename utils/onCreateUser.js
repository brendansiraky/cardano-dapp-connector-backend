import { nanoid } from 'nanoid'

export async function onCreateUser(knex, id) {
    const nonce = nanoid(64)
    const [saved] = await knex.table('users')
        .insert({ id, nonce })
        .returning('nonce')
    return saved
}