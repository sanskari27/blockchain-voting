import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getContract } from '../../../config/etherium';
import Results from '../results';

export default function OngoingElectionDetails({ electionID }: { electionID: number }) {
	const [electionName, setElectionName] = useState('');
	const [candidates, setCandidates] = useState<
		{
			icon: string;
			line1: string;
		}[]
	>([]);

	useEffect(() => {
		(async () => {
			if (electionID < 0) {
				return;
			}
			const contract = await getContract();
			const candidates = await contract.getCandidates(electionID);
			const electionName = await contract.getElectionName(electionID);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const _candidates = candidates.map((candidate: any) => ({
				line1: candidate[2],
				icon: candidate[5],
			}));
			setCandidates(_candidates);
			setElectionName(electionName);
		})();
	}, [electionID]);
	return (
		<Box marginTop={'60px'} width={'full'}>
			<Text className='gradient-text text-center font-extrabold mt-36 text-4xl'>
				Ongoing Election
			</Text>

			<Box className=' mt-10 w-max  mx-auto  '>
				<Results electionName={electionName} parties={candidates} />
			</Box>
		</Box>
	);
}
