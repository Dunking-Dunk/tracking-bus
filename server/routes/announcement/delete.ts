import { Announcement } from "../../models/Announcement";
import express, {Request, Response} from 'express'
import {requireAuth} from '../../middleware/require-auth'
const router = express.Router();

router.delete('/api/announcement/:id',requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params

    await Announcement.findByIdAndDelete(id)
    res.send('successfully deleted').status(200)
})

export {router as DeleteAnnouncement}