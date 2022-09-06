import store from '../store';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {Dispatch, AnyAction} from '@reduxjs/toolkit';
import {ThunkDispatch} from "redux-thunk";
import {useParams} from "react-router-dom";

type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, null, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppParams = () => useParams<{id: string}>()
