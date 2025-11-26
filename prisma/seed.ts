

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prismaClient = new PrismaClient()

async function main() {
    const email = 'admin@marrakech.com'
    const password = 'admin123'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prismaClient.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    })

    console.log({ user })
}

main()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })

