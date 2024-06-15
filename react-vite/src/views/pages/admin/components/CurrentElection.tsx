import { Box, Button, Center, Text } from '@chakra-ui/react';
import { PARTY_BJP } from '../../../../assets/Images';
import Results from '../../../components/results';

export default function CurrentElection() {
	return (
		<Box marginTop={'60px'} width={'full'}>
			<Text className='gradient-text text-center font-extrabold mt-36 text-4xl'>
				Ongoing Election
			</Text>

			<Box className=' mt-10 w-max  mx-auto  '>
				<Results
					electionName={'Uttar Pradesh Election'}
					parties={[
						{ icon: PARTY_BJP, line1: 100 },
						{ icon: PARTY_BJP, line1: 100 },
						{ icon: PARTY_BJP, line1: 100 },
						{ icon: PARTY_BJP, line1: 100 },
						{ icon: PARTY_BJP, line1: 100 },
					]}
				/>
			</Box>
			<Center>
				<Button
					className='mt-10 w-max  mx-auto'
					colorScheme='blue'
					variant={'outline'}
					size='lg'
					rounded={'full'}
				>
					End Election
				</Button>
			</Center>
		</Box>
	);
}
