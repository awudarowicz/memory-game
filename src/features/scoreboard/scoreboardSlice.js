import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scores: []
}

const scoreboardSlice = createSlice({
    name: 'scoreboard',
    initialState,
    reducers: {
        addScore: (state, action) => {
            state.scores = [...state.scores, action.payload]
                .sort((a, b) => a.clicks - b.clicks)
                .slice(0, 10);
        }
    }
})

export default scoreboardSlice.reducer;
export const { addScore } = scoreboardSlice.actions

export const selectScores = state => state.scoreboard.scores;