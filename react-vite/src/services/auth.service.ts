import axios from 'axios';
import APIInstance from '../config/APIInstance';
import { SERVER_URL } from '../config/const';

export default class AuthService {
	static async isAuthenticated() {
		try {
			await axios.get(SERVER_URL + 'sessions/validate-auth', {
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0',
				},
				withCredentials: true,
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	static async login(username: string, password: string) {
		try {
			await APIInstance.post(`/sessions/login`, {
				username,
				password,
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	static async verifyPassword(password: string) {
		try {
			await APIInstance.post(`/sessions/verify-password`, {
				password,
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	static async logout() {
		try {
			await APIInstance.post(`/sessions/login`);
			return true;
		} catch (err) {
			return false;
		}
	}
}
