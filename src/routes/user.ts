import { Router } from 'express'
import { Response } from 'express'
import { authenticateJWT } from '../middleware/jwt'

// eslint-disable-next-line new-cap
const router = Router()

router.get('/', authenticateJWT, (req: any, res: Response) => {
    const user = req.user
    console.log(user)
    res.json({
        user,
    })
})

export default router
