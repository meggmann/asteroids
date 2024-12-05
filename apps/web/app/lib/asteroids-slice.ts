import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAsteroid } from '@asteroids/shared/schemas';

export interface AsteroidsState {
  asteroids: IAsteroid[];
  asteroidsIds: string[];
}

const initialState: AsteroidsState = {
  asteroids: [],
  asteroidsIds: [],
};

const asteroidsSlice = createSlice({
  name: 'asteroids',
  initialState,
  reducers: {
    saveAsteroid(state, action: PayloadAction<IAsteroid>) {
      state.asteroids.push(action.payload);
      state.asteroidsIds.push(action.payload.id);
    },
    removeAsteroid(state, action: PayloadAction<string>) {
      state.asteroids = state.asteroids.filter(asteroid => asteroid.id !== action.payload);
      state.asteroidsIds = state.asteroidsIds.filter(id => id !== action.payload);
    },
  },
});

export const { saveAsteroid, removeAsteroid } = asteroidsSlice.actions;
export const asteroidsReducer = asteroidsSlice.reducer;