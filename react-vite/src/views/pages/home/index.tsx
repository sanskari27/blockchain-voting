import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RED_CIRCLE } from '../../../assets/Images';
import { POPULAR_NEWS, TRENDING_NEWS } from '../../../config/const';
import { getContract } from '../../../config/etherium';
import { HomeNavbar } from '../../components/navbar';
import OngoingElectionDetails from '../../components/ongoing_election_details';
import Results from '../../components/results';
import Each from '../../components/utils/Each';
import News from './components/News';

export default function Home() {
	const [isOngoingElection, setIsOngoingElection] = useState(false);
	const [currentElectionId, setCurrentElectionId] = useState(-1);

	const [previousElection, setPreviousElection] = useState<
		{
			electionName: string;
			parties: {
				icon: string;
				line1: number;
			}[];
		}[]
	>([]);

	useEffect(() => {
		(async () => {
			const contract = await getContract();
			const election_id = await contract.getCurrentElectionId();
			try {
				const election = await contract.isElectionInProgress(election_id);
				setIsOngoingElection(election);
			} catch (e) {
				//ignore
			}
			setCurrentElectionId(election_id);

			const previousElection: {
				electionName: string;
				parties: {
					icon: string;
					line1: number;
				}[];
			}[] = [];

			for (let i = Number(election_id) - 1; i >= 0; i--) {
				const candidates = await contract.getResult(i);

				const electionName = await contract.getElectionName(i);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const _candidates = candidates.map((candidate: any) => ({
					line2: Number(candidate[3]).toString(),
					line1: candidate[2],
					icon: candidate[5],
				}));
				previousElection.push({ electionName, parties: _candidates });
			}

			setPreviousElection(previousElection);
		})();
	}, []);

	return (
		<Box className='min-h-screen w-screen'>
			<HomeNavbar />
			<Image src={RED_CIRCLE} alt='red circle' className='absolute top-36 -left-80 select-none' />
			{isOngoingElection && <OngoingElectionDetails electionID={currentElectionId} />}

			<Box marginTop={'10%'} width={'full'} hidden={previousElection.length === 0}>
				<Text className='gradient-text text-center font-extrabold  text-4xl'>
					Previous Election
				</Text>

				<Each
					items={previousElection}
					render={(item) => (
						<Box className=' mt-10 w-max  mx-auto  '>
							<Results electionName={item.electionName} parties={item.parties} />
						</Box>
					)}
				/>
			</Box>
			<Box id='news' marginTop={'60px'} width={'full'}>
				<Text className='gradient-text text-center font-extrabold mt-36 text-4xl'>
					Popular News
				</Text>

				<Box className=' mt-10 w-max  mx-auto  '>
					<Flex gap={6}>
						<Each items={POPULAR_NEWS} render={(item) => <News {...item} />} />
					</Flex>
				</Box>
			</Box>
			<Box marginTop={'60px'} width={'full'}>
				<Text className='gradient-text text-center font-extrabold mt-36 text-4xl'>
					Trending News
				</Text>

				<Box className=' mt-10 w-max  mx-auto  '>
					<Flex gap={6}>
						<Each items={TRENDING_NEWS} render={(item) => <News {...item} />} />
					</Flex>
				</Box>
			</Box>
		</Box>
	);
}
