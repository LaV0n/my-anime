import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ColorModeType, ProfileDataType, UserDataType } from '../common/types'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'
import { AppRootStateType } from './store'
import { defaultImg } from '../common/variables'

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
   profileImg: defaultImg.girl,
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
      setProfileImg(state, action: PayloadAction<string>) {
         state.profileImg = action.payload
      },
   },
})

export const profileReducer = slice.reducer
export const { setUserName, setColorMode, setProfileImg } = slice.actions

export const setStorageData = createAsyncThunk<unknown, undefined, { state: AppRootStateType }>(
   'profile/setStorageColorMode',
   async (_, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      try {
         await setUserStorageData({
            name: getState().profile.name,
            email: getState().auth.email,
            uid: getState().auth.uid,
            colorMode: getState().profile.colorMode,
            profileImg: getState().profile.profileImg,
         })
         dispatch(changeStatus('success'))
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
      }
   }
)
