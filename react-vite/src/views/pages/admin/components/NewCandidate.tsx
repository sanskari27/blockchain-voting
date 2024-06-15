import { AttachmentIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import APIInstance from '../../../../config/APIInstance';
import { getContract } from '../../../../config/etherium';
import { StoreNames, StoreState } from '../../../../store';
import {
	reset,
	setCandidateImage,
	setName,
	setParty,
	setPartyImage,
} from '../../../../store/reducers/CandidateReducer';

export default function NewCandidate() {
	const dispatch = useDispatch();
	const toast = useToast();
	const { candidateImage, name, party, partyImage } = useSelector(
		(state: StoreState) => state[StoreNames.CANDIDATE]
	);

	const handleAdd = async () => {
		let candidateImageName = '';
		let partyImageName = '';
		try {
			const formData1 = new FormData();
			formData1.append('file', candidateImage as Blob);
			const {
				data: { name: _candidateImageName },
			} = await APIInstance.post('/upload-media', formData1, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			candidateImageName = _candidateImageName;
		} catch (e) {
			toast({
				title: 'Error',
				description: 'Error uploading candidate image',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		try {
			const formData2 = new FormData();
			formData2.append('file', partyImage as Blob);
			const {
				data: { name: _partyImageName },
			} = await APIInstance.post('/upload-media', formData2, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			partyImageName = _partyImageName;
		} catch (e) {
			toast({
				title: 'Error',
				description: 'Error uploading party image',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		const contract = await getContract();

		try {
			await contract.addCandidate(name, party, candidateImageName, partyImageName);
			toast({
				title: 'Success',
				description: 'Candidate added successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			dispatch(reset());
			window.location.reload();
		} catch (e) {
			toast({
				title: 'Error',
				description: 'Error adding candidate',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}
	};

	return (
		<Box marginTop={'90px'} width={'full'}>
			<Box className=' mt-10 w-[60%]  mx-auto  '>
				<Box className=' glass rounded-3xl py-12 px-24 '>
					<Text textAlign={'center'} className='gradient-text' fontSize={'3xl'} fontWeight={'bold'}>
						New Candidate Details
					</Text>
					<FormControl>
						<FormLabel>Candidate Name</FormLabel>
						<Input
							width={'100%'}
							type='text'
							value={name}
							onChange={(e) => dispatch(setName(e.target.value))}
						/>
					</FormControl>
					<FormControl marginTop={'1rem'}>
						<FormLabel>Party Name</FormLabel>
						<Input
							width={'100%'}
							type='text'
							value={party}
							onChange={(e) => dispatch(setParty(e.target.value))}
						/>
					</FormControl>
					<Flex justifyContent={'space-between'}>
						<FormControl
							marginTop={'1rem'}
							py={'0.5rem'}
							className='bg-primary-blue rounded-full'
							width={'48%'}
						>
							<FormLabel textAlign={'center'}>
								<AttachmentIcon mr={'1rem'} />
								Add Candidate Image
							</FormLabel>
							<Input
								width={'100%'}
								type='file'
								className='hidden'
								onChange={(e) =>
									dispatch(setCandidateImage(e.target.files ? e.target.files[0] : null))
								}
							/>
						</FormControl>
						<FormControl
							py={'0.5rem'}
							marginTop={'1rem'}
							className='bg-primary-blue rounded-full'
							width={'48%'}
						>
							<FormLabel textAlign={'center'}>
								<AttachmentIcon mr={'1rem'} />
								Add Party Image
							</FormLabel>
							<Input
								width={'100%'}
								type='file'
								className='hidden'
								onChange={(e) => dispatch(setPartyImage(e.target.files ? e.target.files[0] : null))}
							/>
						</FormControl>
					</Flex>
					<Center marginTop={'1rem'}>
						<Button
							rounded={'full'}
							colorScheme='purple'
							px={'4rem'}
							py={'1rem'}
							onClick={handleAdd}
						>
							Add Candidate
						</Button>
					</Center>
				</Box>
			</Box>
		</Box>
	);
}
