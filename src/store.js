import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './features/cards/cardsSlice';
import scoreboardSlice from './features/scoreboard/scoreboardSlice';
import { loadState, saveState } from './lib/localStorage';

const preloadedState = {};

const scoreboardCache = loadState('scoreboard');
if (scoreboardCache) {
    preloadedState.scoreboard = scoreboardCache;
}

const store = configureStore({
    reducer: {
        cards: cardsSlice,
        scoreboard: scoreboardSlice
    },
    preloadedState
});

store.subscribe(() => {
    saveState('scoreboard', store.getState().scoreboard);
});

export default store;
