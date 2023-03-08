import { Announcement } from "../../models/Announcement";
import express, {Request, Response} from 'express'

const router = express.Router();

router.delete('/api/announcement/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    await Announcement.findOne({id})
    res.send('successfully deleted').status(200)
})