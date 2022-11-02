import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
