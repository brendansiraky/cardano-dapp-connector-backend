require('dotenv').config()

const {
    POSTGRES_HOST,
    JWT_SECRET
} = process.env

const config = {
    POSTGRES_HOST,
    JWT_SECRET
}

module.exports = config