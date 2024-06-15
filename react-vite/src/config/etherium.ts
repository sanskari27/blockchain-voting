/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import abi from './abi.json';

export const provider = new ethers.BrowserProvider((window as any).ethereum);

export async function getSigner() {
	return await provider.getSigner();
}

export async function getContract() {
	const contract = new ethers.Contract(
		import.meta.env.VITE_CONTRACT_ADDRESS as string,
		abi,
		await getSigner()
	);

	return contract;
}
