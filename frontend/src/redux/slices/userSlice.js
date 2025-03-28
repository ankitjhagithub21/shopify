import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch(`${apiUrl}/user`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
});



export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async () => {
    await fetch(`${apiUrl}/logout`, {
      credentials: "include",
    });
  }
   
   
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isLoading:false,
  },
  reducers: {
    setUser:(state,action)=>{
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
   
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
    })
  },
 
});

export const { setUser } = userSlice.actions
export default userSlice.reducer;
