import express, { Request, Response } from 'express'
import {requireAuth} from '../../middleware/require-auth'
import { Driver } from '../../models/Driver'

const router = express.Router()

router.delete('/api/driver/:id',requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params

    await Driver.findByIdAndDelete(id)

    res.status(200).send("successfully deleted")
})

export {router as DeleteDriver}