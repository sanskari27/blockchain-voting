import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import { CandidateState } from '../types/CandidateState';

const initialState: CandidateState = {
	name: '',
	party: '',
	candidateImage: null,
	partyImage: null,
};

const Slice = createSlice({
	name: StoreNames.CANDIDATE,
	initialState,
	reducers: {
		reset: (state) => {
			state.name = '';
			state.party = '';
			state.candidateImage = null;
			state.partyImage = null;
		},

		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setParty: (state, action: PayloadAction<string>) => {
			state.party = action.payload;
		},
		setCandidateImage: (state, action: PayloadAction<File | null>) => {
			state.candidateImage = action.payload;
		},
		setPartyImage: (state, action: PayloadAction<File | null>) => {
			state.partyImage = action.payload;
		},
	},
});

export const { reset, setCandidateImage, setName, setParty, setPartyImage } = Slice.actions;

export default Slice.reducer;
