import { AccountDB } from '../../mongo';
import { AUTH_ERRORS, CustomError, ERRORS } from '../errors';
import { IDType } from '../types';
import UserService from './user';

export default class SessionService {
	static async findAccountById(id: IDType) {
		const account = await AccountDB.findById(id);
		if (!account) {
			throw new CustomError(ERRORS.NOT_FOUND);
		}

		return new UserService(account);
	}

	static async login(username: string, password: string) {
		const user = await AccountDB.findOne({ username }).select('+password');
		if (user === null) {
			throw new CustomError(AUTH_ERRORS.USER_NOT_FOUND_ERROR);
		}

		const password_matched = await user.verifyPassword(password);
		if (!password_matched) {
			throw new CustomError(AUTH_ERRORS.USER_NOT_FOUND_ERROR);
		}

		return [
			{ authToken: user.getAuthToken(), refreshToken: user.getRefreshToken() },
			new UserService(user),
		] as [{ authToken: string; refreshToken: string }, UserService];
	}

	static async register(username: string, password: string) {
		try {
			const user = await AccountDB.create({
				username,
				password,
			});

			return [
				{ authToken: user.getAuthToken(), refreshToken: user.getRefreshToken() },
				new UserService(user),
			] as [{ authToken: string; refreshToken: string }, UserService];
		} catch (err) {
			throw new CustomError(AUTH_ERRORS.USER_ALREADY_EXISTS);
		}
	}
}
