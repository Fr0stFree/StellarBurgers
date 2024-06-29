import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {Location, useLocation} from 'react-router-dom';

import store from "./services/store";

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
export type TLocationState = { from: Location; background: Location }

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppLocation: () => Location<TLocationState> = useLocation;
