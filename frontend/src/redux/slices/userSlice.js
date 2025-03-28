import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch(`${apiUrl}/user`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data;
  }
);

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if(action.payload.success){
        state.data = action.payload.data
      }else{
         state.data = null;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });

    


    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.data = action.payload.data;
        
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.data = action.payload.data;
      }
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
       state.data = null;
    });
  },
});

export default userSlice.reducer;
