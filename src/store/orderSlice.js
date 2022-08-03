import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";

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
            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера!')
            }
            const actualData = await response.json();
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
        closeDetailsModal(state){
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
            .addCase(fetchOrder.pending, (state, action) => {
                state.isPending = true;
                state.isFailed = false;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.orderNumber = 0;
                state.name = '';
                state.isPending = false;
                state.isFailed = true;
            })
    }
    /*extraReducers: {
        [fetchOrder.fulfilled]: (state, action) => {
            state.orderNumber = action.payload.order.number;
            state.name = action.payload.name;
            state.isOpened = true;
        },
        [fetchOrder.rejected]: state => {
            state.name = '';
            state.orderNumber = 0;
            state.data = [];
        }
    }*/
})

export const {closeDetailsModal} = orderSlice.actions;
export default orderSlice.reducer;