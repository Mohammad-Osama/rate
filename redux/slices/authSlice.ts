import { createSlice, createAsyncThunk , PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store"

/* const ISSERVER = typeof window === "undefined";
 
  // Access localStorage
  const token =()=>{
    if(!ISSERVER)
    return JSON.parse(localStorage.getItem('token') as string) 
  }  
 */

//const userData = parseJwt(token)

interface IState {
    id: string |null;
    first_name: string
    last_name: string
    email: string
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: any

}

const initialState :IState = {

    id :null,
    first_name : "",
    last_name : "",
    email:"" , 
    
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
  
}

export const login = createAsyncThunk(
  "auth/login",
  async (userInput :any , thunkAPI) => {  // type to userinput to be added later ??
    try {
      const response = await axios.post(`/api/users/login`, userInput)
     // console.log('response login', response);
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
      }
      return response.data
    } catch (error :any ) {
      const message = error.response.data
      /*  (error.response && 
        error.response.data &&
        error.response.data.message)
        || error.message||
        error.toString() */
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    
       await localStorage.removeItem('token')
    
    }
  
)


export const register = createAsyncThunk(
  "auth/register",
  async (userInput :any, thunkAPI) => {  // type to userinput to be added later ??
    try {
      const response = await axios.post(`/api/users/register`, userInput)
      console.log('response register', response);
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
      }
      return response.data
    } catch (error : any) {
      const message = error.response.data
      /*  (error.response && 
        error.response.data &&
        error.response.data.message)
        || error.message||
        error.toString() */
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const authSlice = createSlice({

  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    }


  },
  extraReducers: (builder)=> {
    builder 
    // login cases
     .addCase(login.pending, (state)=>{
      state.isLoading = true
     })
     .addCase(login.fulfilled , (state,action)=>{
      state.isLoading = false
      state.isSuccess = true
      state.id = action.payload.id
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      
     })
     .addCase(login.rejected , (state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload as any
      /* state.id = null
      state.status = ""
      state.first_name = ""
      state.last_name =  ""
      state.email = "" */
      
     })
       // register cases 
     .addCase(register.pending, (state)=>{
      state.isLoading = true
     })
     .addCase(register.fulfilled , (state,action)=>{
      state.isLoading = false
      state.isSuccess = true
      state.id = action.payload.id
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      
     })
     .addCase(register.rejected , (state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      /* state.id = null
      state.first_name = ""
      state.last_name =  ""
      state.role = "" */
     })
     .addCase(logout.fulfilled , (state,action)=>{
      state.isLoading = false
      state.isError = false
      state.message = ""
      state.id = null
      state.first_name = ""
      state.last_name =  ""
      state.email= ""
     })
  }




})



export const { reset } = authSlice.actions

export default authSlice.reducer

export const authState = (state: RootState) => state.auth