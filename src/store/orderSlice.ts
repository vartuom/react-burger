import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {checkResponse} from "../utils/api";
import {getCookie} from "../utils/storage";
import {TIngredient} from "../types/types";

export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async function(data:Array<TIngredient>, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('accessToken')
                },
                body: JSON.stringify({
                    //раскладываем бургер на компоненты и выбираем id компонентов
                    ingredients: data.map((component: TIngredient) => component._id)
                })
            });
            const actualData = await checkResponse(response)
            return actualData;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

interface IInitialState {
    isOpened: boolean,
    isFailed: boolean,
    isPending: boolean,
    name: string,
    orderNumber: number,
    data: Array<TIngredient>
}

const initialState: IInitialState = {
    isOpened: false,
    isFailed: false,
    isPending: true,
    name: '',
    orderNumber: 0,
    data: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
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