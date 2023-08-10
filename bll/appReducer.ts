import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStatusType, AppType } from '../common/types'

const initialState: AppType = {
   appStatus: 'success',
   error: '',
   isMyListFilter: false,
}

const slice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      changeStatus(state, action: PayloadAction<AppStatusType>) {
         state.appStatus = action.payload
      },
      setError(state, action: PayloadAction<string>) {
         state.error = action.payload
      },
      toggleMyListFilterData(state, action: PayloadAction<boolean>) {
         state.isMyListFilter = action.payload
      },
   },
})

export const appReducer = slice.reducer
export const { setError, changeStatus, toggleMyListFilterData } = slice.actions
