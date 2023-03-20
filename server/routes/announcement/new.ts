import { Announcement } from "../../models/Announcement";
import express, {Request, Response} from 'express'
import { body } from "express-validator";
import { ValidateRequest } from "../../middleware/validate-request";
import {requireAuth} from '../../middleware/require-auth'

const router = express.Router();

router.post('/api/announcement',requireAuth,[body('content').notEmpty().withMessage('content is required')], ValidateRequest, async (req: Request, res: Response) => {
    const announcement = Announcement.build(req.body)
    await announcement.save()

    res.send(announcement).status(201)
})

export {router as NewAnnouncement}