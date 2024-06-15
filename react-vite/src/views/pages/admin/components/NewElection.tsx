import {
	Box,
	Button,
	Center,
	FormControl,
	FormLabel,
	Input,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { getContract } from '../../../../config/etherium';

export default function NewElection() {
	const [name, setName] = useState('');
	const toast = useToast();

	const handleStartElection = async () => {
		const contract = await getContract();
		try {
			await contract.startElection(name);
			toast({
				title: 'Success',
				description: 'Election started successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			window.location.reload();
		} catch (e) {
			toast({
				title: 'Error',
				description: 'Error starting election',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};
	return (
		<Box marginTop={'30px'} width={'full'}>
			<Box className=' mt-10 w-[60%]  mx-auto  '>
				<Box className=' glass rounded-3xl py-12 px-24 '>
					<Text textAlign={'center'} className='gradient-text' fontSize={'3xl'} fontWeight={'bold'}>
						New Election Details
					</Text>
					<FormControl>
						<FormLabel>Election Name</FormLabel>
						<Input
							width={'100%'}
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>
					<Center marginTop={'1rem'}>
						<Button
							rounded={'full'}
							colorScheme='purple'
							px={'4rem'}
							py={'1rem'}
							onClick={handleStartElection}
						>
							Start Election
						</Button>
					</Center>
				</Box>
			</Box>
		</Box>
	);
}
