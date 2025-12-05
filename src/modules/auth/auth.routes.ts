import  express from 'express';
import { userControllers } from './auth.controller';



const router = express.Router()

router.post('/signup' ,userControllers.createUser )


export const authRoutes = router;