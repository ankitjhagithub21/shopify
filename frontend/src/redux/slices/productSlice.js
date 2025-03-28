import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products asynchronously
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await fetch(`/api/products`);
  const data = await res.json();
  return data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (productData) => {
  const res = await fetch(`/api/products`, {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(productData)
  });
  
  const resData = await res.json();

  return resData.data;
  
});

// Delete a product asynchronously
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId) => {
  await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  return productId; 
});



export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    isLoading: false,
    isError: false
  },
  reducers: {},  
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Handle addProduct
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.data.push(action.payload)
    });

    // Handle deleteProduct
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.data = state.data.filter((product) => product._id != action.payload);
    });
  }
});

export default productSlice.reducer;
