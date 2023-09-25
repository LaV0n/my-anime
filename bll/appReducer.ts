import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStatusType, AppType, FilterScreenType } from '../common/types'

const initialState: AppType = {
   appStatus: 'success',
   error: '',
   backLinkSteps: ['Seasonal'],
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
      addBackLinkStep(state, action: PayloadAction<FilterScreenType | string>) {
         if (
            action.payload === 'Search' ||
            action.payload === 'MyList' ||
            action.payload === 'Seasonal' ||
            action.payload === 'Home'
         ) {
            state.backLinkSteps = [action.payload]
         } else {
            state.backLinkSteps.push(action.payload)
         }
      },
      delBackLinkStep(state) {
         state.backLinkSteps.pop()
      },
   },
})

export const appReducer = slice.reducer
export const { setError, changeStatus, addBackLinkStep, delBackLinkStep } = slice.actions
