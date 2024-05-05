import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {AppDispatch, RootState} from './services/store'
import { useLocation, Location } from 'react-router-dom';

interface LocationState {
  from: Location;
  background: Location;
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppLocation: () => Location<LocationState> = useLocation;
