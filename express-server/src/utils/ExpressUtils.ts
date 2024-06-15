import { Response } from 'express';
import fs from 'fs';

type ResponseData = {
	res: Response;
	status: 200 | 201 | 400 | 401 | 403 | 404 | 500;
	data?: object;
};
type FileResponseData = Omit<ResponseData, 'status' | 'data'> & {
	filename: string;
	filepath: string;
};

export const Respond = ({ res, status, data = {} }: ResponseData) => {
	if (status === 200 || status === 201) {
		return res.status(status).json({ ...data, success: true });
	}
	return res.status(status).json({ ...data, success: false });
};

export const RespondFile = ({ res, filename, filepath }: FileResponseData) => {
	const stat = fs.statSync(filepath);
	res.set('content-length', stat.size.toString());
	res.status(200).sendFile(filepath);
};
