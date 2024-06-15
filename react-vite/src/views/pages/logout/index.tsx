import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION } from '../../../config/const';
import AuthService from '../../../services/auth.service';

export default function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		AuthService.logout().then(() => {
			navigate(NAVIGATION.HOME);
		});
	}, [navigate]);

	return <></>;
}
