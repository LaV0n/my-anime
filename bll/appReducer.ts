import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStatusType, AppType } from '../common/types'

const initialState: AppType = {
   appStatus: 'success',
   error: '',
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
   },
})

export const appReducer = slice.reducer
export const { setError, changeStatus } = slice.actions
