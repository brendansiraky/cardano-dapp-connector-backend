const { nanoid } = require('nanoid')

const generateJwtSecret = () => {
    const secretId = nanoid(64)
    console.log(secretId)
}
generateJwtSecret()

