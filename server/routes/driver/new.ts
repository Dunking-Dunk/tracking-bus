import express, {Request, Response} from 'express'
import { Driver } from '../../models/Driver';
import { body } from 'express-validator';
import {requireAuth} from '../../middleware/require-auth'
import { ValidateRequest } from '../../middleware/validate-request'
import { BadRequestError } from '../../errors/bad-request-error';
import multer from 'multer'

const router = express.Router()

const Storage = multer.diskStorage({
    destination: 'drivers',
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: Storage,
}).single('avatar')

router.post('/api/driver',requireAuth,
    async (req: Request, res: Response) => {
        
        upload(req, res, async (err) => {
            console.log(req.file)
            if (err instanceof multer.MulterError) {
              } else if (err) {
                throw new BadRequestError(err)
            }
            const driver = Driver.build({
                ...req.body,
                photoUrl: {
                    data: req.file?.path,
                    contentType: req.file?.mimetype
                }
            }
            )
           await driver.save()
           res.json(driver).status(201)
        })
    
      
})

export { router as NewDriver}