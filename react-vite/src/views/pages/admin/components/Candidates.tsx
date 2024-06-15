import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/etherium';
import Results from '../../../components/results';

export default function Candidates({ electionID }: { electionID: number }) {
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

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const _candidates = candidates.map((candidate: any) => ({
				line1: candidate[2],
				icon: candidate[5],
			}));
			setCandidates(_candidates);
		})();
	}, [electionID]);
	return (
		<Box marginTop={'60px'} width={'full'} hidden={candidates.length === 0}>
			<Text className='gradient-text text-center font-extrabold mt-36 text-4xl'>Candidates</Text>

			<Box className=' mt-10 w-max  mx-auto  '>
				<Results electionName={''} parties={candidates} />
			</Box>
		</Box>
	);
}
