import { createSlice } from '@reduxjs/toolkit';

export type PROFILE_TYPE = 'USER' | 'COMPANY';

export interface ProfileState {
   profile: PROFILE_TYPE;
}

const initialState: ProfileState = {
   profile: 'USER',
};

const slice = createSlice({
   name: 'ProfileSlice',
   initialState,
   reducers: {
      setProfile: (state, { payload }: { payload: PROFILE_TYPE }) => ({
         ...state,
         profile: payload,
      }),
   },
});

export const { setProfile } = slice.actions;

export default slice.reducer;
