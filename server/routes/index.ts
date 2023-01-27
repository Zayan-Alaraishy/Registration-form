import { Router } from 'express';
import { signUp } from './../controllers';
import { userTypeValidate } from '../middlewares';

const route = Router();

route.post('/signup', userTypeValidate, signUp);

export default route;
