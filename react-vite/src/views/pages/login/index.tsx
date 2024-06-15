import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	VStack,
	useBoolean,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN, RED_CIRCLE } from '../../../assets/Images';
import { NAVIGATION } from '../../../config/const';
import AuthService from '../../../services/auth.service';

export default function Login() {
	const [show, setShow] = useBoolean(false);
	const navigate = useNavigate();
	const toast = useToast();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		AuthService.login(username, password).then((res) => {
			if (res) {
				navigate(NAVIGATION.ADMIN);
				return;
			}
			toast({
				title: 'Login failed',
				description: 'Invalid username or password',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		});
	};

	return (
		<Box className='min-h-screen w-screen'>
			<Image src={RED_CIRCLE} alt='red circle' className='absolute top-36 -left-80 select-none' />
			<Box marginTop={'60px'} width={'full'} />
			<Flex className='justify-center items-center h-screen'>
				<VStack width={'full'} justifyContent={'center'}>
					<Text className='text-primary-purple text-[4rem] font-bold'>Hello, Friend!</Text>
					<Text className='text-[1.25rem] font-medium'>
						Enter your personal details and start journey with us
					</Text>
					<Image src={LOGIN} />
				</VStack>
				<Flex width={'full'} justifyContent={'center'}>
					<VStack width={'70%'} justifyContent={'center'} className='glass rounded-[48px] py-12'>
						<Text className='gradient-text text-3xl font-bold '>Sign in to Block Vote</Text>
						<Box width={'80%'} marginTop={'3rem'}>
							<FormControl>
								<FormLabel>Admin ID</FormLabel>
								<Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
							</FormControl>
							<FormControl marginTop={'1rem'}>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										pr='4.5rem'
										type={show ? 'text' : 'password'}
										placeholder='Enter password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<InputRightElement pr={'0px'}>
										<IconButton
											aria-label='Show password'
											as={'div'}
											icon={show ? <ViewOffIcon /> : <ViewIcon />}
											onClick={setShow.toggle}
										/>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Center mt={'1rem'}>
								<Button
									colorScheme={'purple'}
									variant='outline'
									rounded={'full'}
									px={'2rem'}
									className='group'
									onClick={handleLogin}
								>
									<span className='text-white group-hover:text-primary-blue'>Login</span>
								</Button>
							</Center>
						</Box>
					</VStack>
				</Flex>
			</Flex>
		</Box>
	);
}
