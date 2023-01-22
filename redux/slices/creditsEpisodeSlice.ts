import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICredits } from "../../helpers/types";
import { RootState } from "../store"


const initialState: ICredits = {
  id: 0,
  cast: [],
  crew: [],
  guest_stars: [],
}

/* export const addCredits = createAsyncThunk(
    "credits/add",
    async (userInput :ICredits , thunkAPI) => {  
      try {
        
        return userInput
      } catch (error :any ) {
        alert("error in reduxxx" + error)
        return thunkAPI.rejectWithValue(error);
      }
    }
  ) */
const creditsSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {
    addCredits: (state, action: PayloadAction<ICredits>) => {
      state.id = action.payload.id
      state.cast = action.payload.cast
      state.crew = action.payload.crew
      state.guest_stars = action.payload.guest_stars?action.payload.guest_stars:[]
      console.log(state.id)
      console.log(state.cast)
      console.log(state.crew)
      console.log(state.guest_stars)
    },
    removeCredits: (state) => {
      state.id = 0
      state.cast =[]
      state.crew = []
      state.guest_stars = []
    },
  },
  /* extraReducers: (builder)=> {
    builder 
    // login cases
     .addCase(addCredits.fulfilled, (state,action: PayloadAction<ICredits>)=>{
      state = action.payload
     })
     
  } */

})


export const { addCredits, removeCredits } = creditsSlice.actions

export default creditsSlice.reducer

export const creditsState = (state: RootState) => state.credits

