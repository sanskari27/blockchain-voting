import {
	AbsoluteCenter,
	Box,
	Divider,
	FormControl,
	FormLabel,
	Image,
	Input,
	Text,
	useBoolean,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { RED_CIRCLE } from '../../../assets/Images';
import { NAVIGATION } from '../../../config/const';
import { getContract } from '../../../config/etherium';
import AuthService from '../../../services/auth.service';
import Each from '../../components/utils/Each';
import Candidate from './components/Candidate';

export default function Vote() {
	const [loading, setLoading] = useBoolean(false);
	const navigate = useNavigate();
	const toast = useToast();
	const [voter_id, setVoterId] = useState('');

	const [searchParams] = useSearchParams();
	const election_ID = searchParams.get('election_id');
	const electionID = election_ID ? Number(election_ID) : -1;

	useEffect(() => {
		AuthService.isAuthenticated().then((res) => {
			if (!res) {
				navigate('/');
				return;
			}
			setLoading.off();
		});
	}, [navigate, setLoading]);

	const [candidates, setCandidates] = useState<
		{
			candidateName: string;
			candidate_id: number;
			partyName: string;
			candidateImage: string;
			partyImage: string;
		}[]
	>([]);

	useEffect(() => {
		(async () => {
			if (electionID < 0) {
				return;
			}
			const contract = await getContract();
			const candidates = await contract.getCandidates(electionID);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const _candidates = candidates.map((candidate: any) => ({
				candidateName: candidate[0],
				candidate_id: candidate[1],
				partyName: candidate[2],
				candidateImage: candidate[4],
				partyImage: candidate[5],
			}));
			setCandidates(_candidates);
		})();
	}, [electionID]);

	if (loading || !candidates.length) {
		return <></>;
	}

	if (!electionID) {
		<Navigate to={NAVIGATION.ADMIN} />;
	}

	const voteCandidate = async (candidate_id: number) => {
		if (!voter_id) {
			toast({
				title: 'Error',
				description: 'Voter ID is required',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			return;
		}
		try {
			const contract = await getContract();
			await contract.castVote(voter_id, candidate_id);

			toast({
				title: 'Success',
				description: 'Vote casted successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});

			setVoterId('');
		} catch (e) {
			toast({
				title: 'Error',
				description: 'Error casting vote',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Box className='min-h-screen w-screen'>
			<Image src={RED_CIRCLE} alt='red circle' className='absolute top-36 -left-80 select-none' />
			<Text
				textAlign={'center'}
				marginTop={'30px'}
				className='gradient-text'
				fontSize={'3xl'}
				fontWeight={'bold'}
			>
				Vote for Candidate
			</Text>
			<FormControl width={'60%'} mx={'auto'}>
				<FormLabel>Voter ID</FormLabel>
				<Input
					width={'100%'}
					type='text'
					placeholder='Enter Voter ID'
					value={voter_id}
					onChange={(e) => setVoterId(e.target.value)}
				/>
			</FormControl>

			<Box className='relative w-[75%] mx-auto'>
				<Divider className='mt-10' />
				<AbsoluteCenter className='bg-background px-4'>AND</AbsoluteCenter>
			</Box>
			<Each
				items={candidates}
				render={(item) => (
					<Candidate {...item} onCandidateVote={() => voteCandidate(item.candidate_id)} />
				)}
			/>
		</Box>
	);
}
