import { NextFunction, Request, Response } from 'express';
import { Cookie, IS_PRODUCTION } from '../../config/const';
import { AUTH_ERRORS, CustomError } from '../../errors';
import { SessionService } from '../../services';
import { Respond } from '../../utils/ExpressUtils';
import { LoginValidationResult, VerifyPasswordResult } from './session.validator';
export const JWT_EXPIRE_TIME = 30 * 60 * 1000;
export const SESSION_EXPIRE_TIME = 28 * 24 * 60 * 60 * 1000;

async function login(req: Request, res: Response, next: NextFunction) {
	const { username, password } = req.locals.data as LoginValidationResult;

	try {
		const [{ authToken, refreshToken }] = await SessionService.login(username, password);
		res.cookie(Cookie.Auth, authToken, {
			sameSite: 'strict',
			expires: new Date(Date.now() + JWT_EXPIRE_TIME),
			httpOnly: IS_PRODUCTION,
			secure: IS_PRODUCTION,
		});
		res.cookie(Cookie.Refresh, refreshToken, {
			sameSite: 'strict',
			expires: new Date(Date.now() + SESSION_EXPIRE_TIME),
			httpOnly: IS_PRODUCTION,
			secure: IS_PRODUCTION,
		});

		return Respond({
			res,
			status: 200,
		});
	} catch (err) {
		return next(new CustomError(AUTH_ERRORS.USER_NOT_FOUND_ERROR));
	}
}

async function verifyPassword(req: Request, res: Response, next: NextFunction) {
	const user = req.locals.user;
	const { password } = req.locals.data as VerifyPasswordResult;

	try {
		await SessionService.login(user.username, password);
		return Respond({
			res,
			status: 200,
		});
	} catch (err) {
		return next(new CustomError(AUTH_ERRORS.USER_NOT_FOUND_ERROR));
	}
}

async function register(req: Request, res: Response, next: NextFunction) {
	const { username, password } = req.locals.data as LoginValidationResult;
	try {
		const [{ authToken, refreshToken }] = await SessionService.register(username, password);

		res.cookie(Cookie.Auth, authToken, {
			sameSite: 'strict',
			expires: new Date(Date.now() + JWT_EXPIRE_TIME),
			httpOnly: IS_PRODUCTION,
			secure: IS_PRODUCTION,
		});

		res.cookie(Cookie.Refresh, refreshToken, {
			sameSite: 'strict',
			expires: new Date(Date.now() + JWT_EXPIRE_TIME),
			httpOnly: IS_PRODUCTION,
			secure: IS_PRODUCTION,
		});
		return Respond({
			res,
			status: 200,
		});
	} catch (err) {
		return next(new CustomError(AUTH_ERRORS.USER_NOT_FOUND_ERROR));
	}
}

async function validateAuth(req: Request, res: Response, next: NextFunction) {
	return Respond({
		res,
		status: 200,
	});
}

async function logout(req: Request, res: Response, next: NextFunction) {
	res.clearCookie(Cookie.Auth, {
		sameSite: 'strict',
		httpOnly: IS_PRODUCTION,
		secure: IS_PRODUCTION,
	});
	res.clearCookie(Cookie.Refresh, {
		sameSite: 'strict',
		httpOnly: IS_PRODUCTION,
		secure: IS_PRODUCTION,
	});
	return Respond({
		res,
		status: 200,
	});
}

const Controller = {
	validateAuth,
	login,
	verifyPassword,
	register,
	logout,
};

export default Controller;
