import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: ApiResponse;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

interface ApiResponse {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

const initialState: CounterState = {
  value: {
    id: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
  },
};

const cardSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setData(state, value){
      state.value = value.payload;
    },
    updateProductQuantity(state, value){
      
      const price = state.value.products[value.payload.id].price;
      const num = value.payload.num;

      state.value.total += num * price;
      state.value.products[value.payload.id].quantity += num;
    },
    deleteProduct(state, value){
      
      state.value.total -= value.payload.num * value.payload.price;
      state.value.products = state.value.products.filter(item => item.id !== value.payload.id);
    }
  },
});

export const { setData, updateProductQuantity, deleteProduct } = cardSlice.actions;
export default cardSlice.reducer;