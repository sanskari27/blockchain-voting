import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { SERVER_URL } from '../../../config/const';
import Each from '../utils/Each';

export default function Results({
	parties,
	electionName,
}: {
	electionName: string;
	parties: {
		icon: string;
		line1?: number | string;
		line2?: number | string;
	}[];
}) {
	console.log(electionName, parties);

	return (
		<Box className=' glass rounded-3xl py-12 px-24'>
			<Text textAlign={'center'} color={'white'} fontSize={'3xl'} fontWeight={'bold'}>
				{electionName}
			</Text>
			<Flex className='gap-12 justify-center mt-9'>
				<Each
					items={parties}
					render={(item) => (
						<Box>
							<Image src={SERVER_URL + 'media/' + item.icon} width={'200px'} aspectRatio={1 / 1} />
							<Center gap={2} mt={'0.5rem'}>
								{item.line1 !== undefined && (
									<span className='text-primary-blue font-bold text-lg'>{item.line1}</span>
								)}
							</Center>
							<Center gap={2} mt={'0.5rem'}>
								{item.line2 !== undefined && (
									<span className='text-primary-purple font-bold text-lg'>{item.line2}</span>
								)}
							</Center>
						</Box>
					)}
				/>
			</Flex>
		</Box>
	);
}
