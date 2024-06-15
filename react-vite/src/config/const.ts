export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const WEBPAGE_URL = import.meta.env.VITE_WEBPAGE_URL;
export const DATA_LOADED_DELAY = import.meta.env.VITE_DATA_LOADED_DELAY;

export const NAVIGATION = {
	ADMIN: '/admin',
	LOGIN: '/login',
	VOTE: '/vote',
	LOGOUT: '/logout',
	HOME: '/',
};

export const TRENDING_NEWS = [
	{
		photo: `https://images.news18.com/ibnlive/uploads/2024/03/1710762848_f5614cc6-49a7-44b3-bf76-1837f82b7b4b-3x2.jpeg`,
		heading: `Chief Minister Promises Reforms Amid Protests`,
		text: `In a heated election campaign, the Chief Minister pledged significant reforms if re-elected. This announcement sparked immediate protests from opposition supporters, raising tensions. Authorities are on high alert to manage the unrest as political rallies intensify across the state.`,
		date: `11th June 2024`,
	},
	{
		photo:
			'https://www.shutterstock.com/image-vector/indian-election-conceptual-illustration-people-260nw-2365321863.jpg',
		heading: 'Candidate Accuses Rival of Election Fraud',
		text: 'Accusations of election fraud have been made by a leading candidate against their rival party. The claim has heightened political tensions, with supporters of both sides clashing. The Election Commission is investigating the allegations to ensure a fair and transparent voting process.',
		date: '15th May 2024',
	},
	{
		photo:
			'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202406/665d7c0b33e52-the-chief-election-commissioner-highlighted-that-seizures-of-rs-10-000-crore--including-cash--freebi-031713979-16x9.jpeg?size=948:533',
		heading: 'Election Commission Announces Poll Dates',
		text: 'The Election Commission has officially announced the dates for the upcoming elections. In response, security measures are being tightened across states to ensure a smooth voting process. Political parties are ramping up their campaigns, preparing for a fiercely contested election season.',
		date: '7th April 2024',
	},
];

export const POPULAR_NEWS = [
	{
		photo:
			'https://www.shutterstock.com/image-vector/indian-election-poster-commission-india-260nw-2377148385.jpg',
		heading: 'Major Parties Unveil Key Manifestos',
		text: 'Leading political parties have released their manifestos, focusing on economic revamps and social welfare programs. These promises aim to attract voters from diverse demographics. Analysts predict these manifestos will significantly influence voter decisions in the forthcoming elections.',
		date: '16th May 2024',
	},
	{
		photo:
			'https://bsmedia.business-standard.com/_media/bs/img/article/2024-06/04/full/1717487048-3634.png?im=FitAndFill=(826,465)',
		heading: 'Voter Turnout Expected to Surge Tomorrow',
		text: 'With polls opening tomorrow, a record voter turnout is anticipated. Authorities are making extensive preparations to handle the large crowds and potential unrest. Security has been heightened to ensure the safety of voters and the integrity of the election process.',
		date: '10th June 2024',
	},
	{
		photo:
			'https://bsmedia.business-standard.com/_media/bs/img/article/2023-05/13/full/1683967738-0056.jpeg?im=FitAndFill=(826,465)',
		heading: 'Opposition Leader Calls for Election Boycott',
		text: 'An opposition leader has called for a boycott of the upcoming elections, alleging widespread corruption and bias. This call has led to widespread demonstrations and heightened political tensions. Authorities are closely monitoring the situation, fearing potential clashes and disruptions on election day.',
		date: '10th May 2024',
	},
];
