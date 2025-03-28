import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch(`/api/auth/user`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const res = await fetch(`/api/auth/register`, {
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
    const res = await fetch(`/api/auth/login`, {
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
  },
});

export default userSlice.reducer;
