import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeListType, ProfileType } from '../types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { AppRootStateType } from './store'

const initialState: ProfileType = {
   userId: '1C3yGQgXB8dnInjqUKTA',
   name: '',
   animeList: [],
}

const slice = createSlice({
   name: 'profile',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(getMyAnimeList.fulfilled, (state, action) => {
         if (action.payload) {
            state.animeList = action.payload
         }
      })
   },
})

export const profileReducer = slice.reducer

export const getMyAnimeList = createAsyncThunk<
   AnimeListType[],
   undefined,
   { rejectValue: { error: string }; state: AppRootStateType }
>('profile/getMyAnimeList', async (_, { rejectWithValue, getState }) => {
   try {
      const data = await MyAnimeListAPI.getMyList(getState().profile.userId)
      return data.docs.map(doc => ({ ...doc.data() })) as AnimeListType[]
   } catch (err) {
      const error = errorAsString(err)
      return rejectWithValue({ error })
   }
})
