import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './appReducer'
import { myDataReducer } from './myDataReducer'
import { animeListReducer } from './animeListReducer'
import { authReducer } from './authReducer'
import { profileReducer } from './profileReducer'

export const rootReducer = combineReducers({
   app: appReducer,
   auth: authReducer,
   myData: myDataReducer,
   animeList: animeListReducer,
   profile: profileReducer,
})

export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
//export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
