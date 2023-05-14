import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActiveLink {
  link: string;
}

const initialState: ActiveLink = {
  link: "/",
};

export const activeLinkSlice = createSlice({
  name: "activeLink",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
  },
});

export const { update } = activeLinkSlice.actions;

export default activeLinkSlice.reducer;
