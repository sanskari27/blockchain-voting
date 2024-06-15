import { configureStore } from '@reduxjs/toolkit';

import { StoreNames } from './config';
import { default as CandidateReducer } from './reducers/CandidateReducer';

const store = configureStore({
	reducer: {
		[StoreNames.CANDIDATE]: CandidateReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
