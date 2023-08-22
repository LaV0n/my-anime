import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ColorModeType, ProfileDataType, UserDataType } from '../common/types'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'
import { AppRootStateType } from './store'

export const setUserStorageData = async (user: UserDataType) => {
   try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
   } catch (e) {
      // saving error
   }
}

const initialState: ProfileDataType = {
   name: '',
   colorMode: 'dark',
}
const slice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      setUserName(state, action: PayloadAction<string>) {
         state.name = action.payload
      },
      setColorMode(state, action: PayloadAction<ColorModeType>) {
         state.colorMode = action.payload
      },
   },
})

export const profileReducer = slice.reducer
export const { setUserName, setColorMode } = slice.actions

export const setStorageColorMode = createAsyncThunk<
   unknown,
   ColorModeType,
   { state: AppRootStateType }
>('profile/setStorageColorMode', async (mode, { dispatch, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      await setUserStorageData({
         name: getState().profile.name,
         email: getState().auth.email,
         uid: getState().auth.uid,
         colorMode: mode,
      })
      dispatch(setColorMode(mode))
      dispatch(changeStatus('success'))
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
   }
})
