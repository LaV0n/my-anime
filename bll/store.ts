import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './appReducer'
import { myDataReducer } from './myDataReducer'
import { animeListReducer } from './animeListReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
   app: appReducer,
   auth: authReducer,
   myData: myDataReducer,
   animeList: animeListReducer,
})

export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
//export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
