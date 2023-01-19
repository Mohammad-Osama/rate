import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICredits } from "../../helpers/types";
import { RootState } from "../store"


const initialState: ICredits = {
    id: 0,
    cast: [],
    crew: [],
    guest_stars: [],
}
const creditsSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {
        addCredits: (state, action: PayloadAction<ICredits>) => {
            state = action.payload
        },
    },
})


export const { addCredits } = creditsSlice.actions

export const creditsState = (state: RootState) => state.credits

export default creditsSlice.reducer