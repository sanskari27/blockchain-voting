import { randomBytes, scrypt } from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { JWT_EXPIRE, JWT_SECRET, REFRESH_EXPIRE, REFRESH_SECRET } from '../../src/config/const';
import IAccount from '../types/account';

export const AccountDB_name = 'Account';

const schema = new mongoose.Schema<IAccount>({
	username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		select: false,
	},
});

schema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		this.password = await hashPassword(this.password);
		return next();
	} catch (err: any) {
		return next(err);
	}
});

schema.methods.verifyPassword = async function (password: string) {
	return await matchPassword(password, this.password);
};

schema.methods.getAuthToken = function () {
	return jwt.sign({ id: this._id }, JWT_SECRET, {
		expiresIn: JWT_EXPIRE,
	});
};

schema.methods.getRefreshToken = function () {
	return jwt.sign({ id: this._id }, REFRESH_SECRET, {
		expiresIn: REFRESH_EXPIRE,
	});
};

const AccountDB = mongoose.model<IAccount>(AccountDB_name, schema);

export default AccountDB;

const encryptPassword = (password: string, salt: string) => {
	return new Promise((resolve, reject) => {
		scrypt(password, salt, 32, (err, buffer) => {
			if (err) {
				return reject(err);
			}
			resolve(buffer.toString('hex'));
		});
	});
};

const hashPassword = async (password: string) => {
	const salt = randomBytes(16).toString('hex');
	return `${salt}.${await encryptPassword(password, salt)}`;
};

export const matchPassword = async (password: string, hash: string) => {
	const [salt, originalPassHash] = hash.split('.');

	const currentPassHash = await encryptPassword(password, salt);
	return originalPassHash === currentPassHash;
};
