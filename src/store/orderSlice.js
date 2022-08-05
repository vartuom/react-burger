import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {checkResponse} from "../utils/api";

export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async function(data, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //раскладываем бургер на компоненты и выбираем id компонентов
                    ingredients: data.map((component) => component._id)
                })
            });
            const actualData = await checkResponse(response)
            return actualData;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isOpened: false,
        isFailed: false,
        isPending: true,
        name: '',
        orderNumber: 0,
        data: []
    },
    reducers: {
        setOrderDetailsOpened(state){
            state.isOpened = true;
        },
        setOrderDetailsClosed(state){
            state.isOpened = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orderNumber = action.payload.order.number;
                state.name = action.payload.name;
                state.isPending = false;
            })
            .addCase(fetchOrder.pending, (state) => {
                state.isPending = true;
                state.isFailed = false;
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.orderNumber = 0;
                state.name = '';
                state.isPending = false;
                state.isFailed = true;
            })
    }
})

export const {setOrderDetailsClosed, setOrderDetailsOpened} = orderSlice.actions;
export default orderSlice.reducer;