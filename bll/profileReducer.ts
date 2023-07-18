import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeListType, AnimeType, ProfileType } from '../types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { AppRootStateType } from './store'
import { changeStatus, setError } from './appReducer'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase'

const initialState: ProfileType = {
   animeList: [],
}

const slice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      clearMyList(state) {
         state.animeList = []
      },
   },
   extraReducers: builder => {
      builder.addCase(getMyAnimeList.fulfilled, (state, action) => {
         if (action.payload) {
            state.animeList = action.payload
         }
      })
   },
})

export const profileReducer = slice.reducer
export const { clearMyList } = slice.actions

export const getMyAnimeList = createAsyncThunk<
   AnimeListType[],
   undefined,
   { rejectValue: { error: string }; state: AppRootStateType }
>('profile/getMyAnimeList', async (_, { rejectWithValue, getState }) => {
   try {
      const data = await MyAnimeListAPI.getMyList(getState().auth.uid)
      return data.docs.map(doc => ({ ...doc.data() })) as AnimeListType[]
   } catch (err) {
      const error = errorAsString(err)
      return rejectWithValue({ error })
   }
})
export const addItemToMyList = createAsyncThunk<unknown, AnimeType, { state: AppRootStateType }>(
   'profile/addItemToMyList',
   async (anime, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      try {
         const animeItem: AnimeListType = {
            animeId: anime.id,
            title: anime.title,
            status: 'toWatch',
            rating: 0,
         }
         await addDoc(collection(db, 'users/' + getState().auth.uid + '/list'), animeItem)
         dispatch(changeStatus('success'))
      } catch (err) {
         dispatch(changeStatus('error'))
         const error = errorAsString(err)
         dispatch(setError(error))
      }
   }
)
