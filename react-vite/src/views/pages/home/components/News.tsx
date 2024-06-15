import { Box, Image, Text } from '@chakra-ui/react';

export default function News({
	photo,
	text,
	date,
	heading,
}: {
	photo: string;
	text: string;
	date: string;
	heading: string;
}) {
	return (
		<Box className='rounded-3xl border border-gray-300 w-[420px]  overflow-hidden h-fit pb-2'>
			<Image src={photo} alt='party bjp' className='w-full object-fill h-[50%] ' />
			<Text
				// fontSize={'lg'}
				marginTop={'1rem'}
				textAlign={'center'}
				fontWeight={'medium'}
				color={'white'}
			>
				{heading}
			</Text>
			<Text fontSize={'sm'} marginTop={'0.5rem'} textAlign={'justify'} color={'white'} px={6}>
				{text}
			</Text>
			<Text fontSize={'sm'} marginTop={'0.5rem'} color={'white'} px={6}>
				{date}
			</Text>
		</Box>
	);
}
