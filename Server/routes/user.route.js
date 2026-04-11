import { Router } from "express"
import {attachUser} from '../middleware/index.js'
import { register } from "../controllers/user.controller.js"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = Router()

router.route('/register').post(ClerkExpressRequireAuth(), attachUser , register)

export default router
