import { Document, Types } from 'mongoose';

export default interface IAccount extends Document {
	_id: Types.ObjectId;
	username: string;
	password: string;

	verifyPassword(password: string): Promise<boolean>;
	getAuthToken(): string;
	getRefreshToken(): string;
}
