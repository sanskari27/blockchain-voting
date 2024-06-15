/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	AbsoluteCenter,
	Box,
	Button,
	Center,
	Divider,
	Image,
	useBoolean,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RED_CIRCLE } from '../../../assets/Images';
import { getContract } from '../../../config/etherium';
import AuthService from '../../../services/auth.service';
import { AdminNavbar } from '../../components/navbar';
import OngoingElectionDetails from '../../components/ongoing_election_details';
import Candidates from './components/Candidates';
import NewCandidate from './components/NewCandidate';
import NewElection from './components/NewElection';

export default function Admin() {
	const [loading, setLoading] = useBoolean(false);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		AuthService.isAuthenticated().then((res) => {
			if (!res) {
				navigate('/');
				return;
			}
			setLoading.off();
		});
	}, [navigate, setLoading]);

	const [isOngoingElection, setIsOngoingElection] = useState(false);
	const [currentElectionId, setCurrentElectionId] = useState(-1);

	useEffect(() => {
		(async () => {
			const contract = await getContract();
			const election_id = await contract.getCurrentElectionId();
			try {
				const election = await contract.isElectionInProgress(currentElectionId);
				setIsOngoingElection(election);
			} catch (e) {
				//ignore
			}
			setCurrentElectionId(election_id);
		})();
	}, [currentElectionId]);

	const endElection = async () => {
		const password = prompt('Enter admin id password to end election');
		const verify = AuthService.verifyPassword(password);
		if (!verify) {
			toast({
				title: 'Error',
				description: 'Invalid password',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		try {
			const contract = await getContract();
			await contract.endElection();
			toast({
				title: 'Success',
				description: 'Election ended successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			window.location.reload();
		} catch (e) {
			toast({
				title: 'Error',
				description: 'Could not end election',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const startVoting = async () => {
		navigate('/vote?election_id=' + currentElectionId);
	};

	if (loading) {
		return <></>;
	}

	return (
		<Box className='min-h-screen w-screen'>
			<AdminNavbar />
			<Image src={RED_CIRCLE} alt='red circle' className='absolute top-36 -left-80 select-none' />
			{isOngoingElection ? (
				<>
					<OngoingElectionDetails electionID={currentElectionId} />
					<Center marginTop={'20px'} gap={12}>
						<Button colorScheme='blue' onClick={startVoting} rounded={'full'}>
							Start Voting
						</Button>
						<Button colorScheme='purple' onClick={endElection} rounded={'full'}>
							End Election
						</Button>
					</Center>
				</>
			) : (
				<>
					<Candidates electionID={currentElectionId} />
					<NewCandidate />
					<Box className='relative w-[75%] mx-auto'>
						<Divider className='mt-10' />
						<AbsoluteCenter className='bg-background px-4'>OR</AbsoluteCenter>
					</Box>
					<NewElection />
				</>
			)}
		</Box>
	);
}
