import express, {Request, Response} from 'express'
import { Driver } from '../../models/Driver';
import { body } from 'express-validator';
import {requireAuth} from '../../middleware/require-auth'
import {ValidateRequest} from '../../middleware/validate-request'
import multer from 'multer'

const router = express.Router()

const Storage = multer.diskStorage({
    destination: 'divers',
    filename: (req, file, cb) => {
        cb(null, Date.now + file.originalname)
    }
})

const upload = multer({
    storage: Storage,
})

router.post('/api/diver',requireAuth,
    [
        body('name').not().isEmpty().withMessage('name is required'),
        body('phoneNumber').not().isEmpty().withMessage('phone number is required'),
    ], ValidateRequest, async (req: Request, res: Response) => {
        //ts-no
        upload(req, res, (err) => {
            if *
        })
    const driver = Driver.build(req.body)
        await driver.save()

    res.json(driver).status(201)
})

export { router as NewDriver}