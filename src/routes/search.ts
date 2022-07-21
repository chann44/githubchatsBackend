import { prisma } from '../uttils/prisma'
import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    let username = req.params.username
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        })
        res.json(user)
    } catch (e) {
        res.json(e)
    }
})

export default router
