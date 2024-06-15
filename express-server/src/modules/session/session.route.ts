import express from 'express';
import { VerifySession } from '../../middleware';
import Controller from './session.controller';
import { LoginAccountValidator, VerifyPasswordValidator } from './session.validator';

const router = express.Router();

router.route('/validate-auth').all(VerifySession).get(Controller.validateAuth);

router
	.route('/verify-password')
	.all(VerifySession, VerifyPasswordValidator)
	.post(Controller.verifyPassword);
router.route('/login').all(LoginAccountValidator).post(Controller.login);
router.route('/logout').post(Controller.logout);
router.route('/register').all(LoginAccountValidator).post(Controller.register);

export default router;
