import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shuffleArray from '../../lib/shuffleArray';

const initialState = {
    cards: [],
    status: 'idle',
    error: null,
    activeCardIndex: null,
    activeCardsIndexes: [],
    matches: [],
    clicks: 0,
    startTime: null,
    stopTime: null,
    page: 1
}

let apiUrl = 'https://rickandmortyapi.com/api/character?page=1';
let apiDirection = 'next';

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
    // const response = await fetch('http://localhost:8888/images')
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.info[apiDirection]) {
        apiUrl = data.info[apiDirection];
    }
    else {
        apiDirection = apiDirection === 'next' ? 'prev' : 'next';
    }

    return data;
})

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        flipCard: (state, action) => {
            state.cards[action.payload].active = !state.cards[action.payload].active;
        },
        activateCard: (state, action) => {
            state.activeCardIndex = action.payload;
        },
        deactivateCard: (state, action) => {
            state.activeCardIndex = null;
        },
        addMatch: (state, action) => {
            state.matches.push(action.payload);
            state.activeCardIndex = null;
        },
        incrementClicks: state => {
            state.clicks += 1;
        },
        resetBoard: state => {
            state.clicks = 0;
            state.matches = [];
            state.activeCardIndex = null;
            state.cards = [];
        },
        startTimer: (state, action) => {
            state.startTime = action.payload;
        },
        stopTimer: (state, action) => {
            state.stopTime = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCards.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                const halfCards = action.payload.results.slice(0,12).map((item, index) => {
                    return {
                        id: index + 1,
                        imageUrl: item.image,
                        active: false
                    }
                })

                state.cards = shuffleArray(halfCards.concat(halfCards));
                state.status = 'succeeded'
            })
            .addCase(fetchCards.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})

export default cardsSlice.reducer;
export const { flipCard, activateCard, incrementClicks, addMatch, deactivateCard, resetBoard, startTimer, stopTimer } = cardsSlice.actions

export const selectClicks = state => state.cards.clicks;
export const selectCards = state => state.cards.cards;
export const selectMatches = state => state.cards.matches;
export const selectActiveCardIndex = state => state.cards.activeCardIndex;
export const selectStartTime = state => state.cards.startTime;
export const selectStopTime = state => state.cards.stopTime;

export const flipCardsDelayed = indexes => dispatch => {
    setTimeout(() => {
        indexes.forEach(index => {
            dispatch(flipCard(index))
        });
    }, 1000)
}