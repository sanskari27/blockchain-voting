import IAccount from '../../mongo/types/account';
import { IDType } from '../types';

export default class UserService {
	private _user_id: IDType;
	private _username: string;

	public constructor(account: IAccount) {
		this._user_id = account._id;
		this._username = account.username;
	}

	public get id(): IDType {
		return this._user_id;
	}

	public get username(): string {
		return this._username;
	}
}
