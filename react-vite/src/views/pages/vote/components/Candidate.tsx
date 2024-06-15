import { Box, Button, Center, Flex, Image } from '@chakra-ui/react';
import { SERVER_URL } from '../../../../config/const';

export default function Candidate({
	candidateName,
	partyName,
	candidateImage,
	partyImage,
	onCandidateVote,
}: {
	candidateName: string;
	partyName: string;
	candidateImage: string;
	partyImage: string;
	onCandidateVote: () => void;
}) {
	return (
		<Box marginTop={'30px'} width={'full'}>
			<Box className=' mt-10 w-[60%]  mx-auto  '>
				<Flex className=' glass rounded-3xl py-12 px-24  justify-between'>
					<Box>
						<Image
							src={SERVER_URL + 'media/' + candidateImage}
							width={'200px'}
							aspectRatio={1 / 1}
						/>
						<Center gap={2} mt={'0.5rem'}>
							<span className='text-primary-blue font-bold text-lg'>{candidateName}</span>
						</Center>
					</Box>
					<Center marginTop={'1rem'}>
						<Button
							rounded={'full'}
							colorScheme='purple'
							px={'4rem'}
							py={'1rem'}
							onClick={() => onCandidateVote()}
						>
							Vote Candidate
						</Button>
					</Center>
					<Box>
						<Image src={SERVER_URL + 'media/' + partyImage} width={'200px'} aspectRatio={1 / 1} />
						<Center gap={2} mt={'0.5rem'}>
							<span className='text-primary-blue font-bold text-lg'>{partyName}</span>
						</Center>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
}
