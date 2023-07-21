import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeType, ProfileType } from '../types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { AppRootStateType } from './store'
import { changeStatus, setError } from './appReducer'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
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

export const getMyAnimeList = createAsyncThunk<AnimeType[], undefined, { state: AppRootStateType }>(
   'profile/getMyAnimeList',
   async (_, { getState, dispatch }) => {
      dispatch(changeStatus('loading'))
      try {
         dispatch(changeStatus('success'))
         dispatch(clearMyList)
         const data = await MyAnimeListAPI.getMyList(getState().auth.uid)
         return data.docs.map(doc => ({ ...doc.data(), idDoc: doc.id })) as AnimeType[]
      } catch (err) {
         dispatch(changeStatus('error'))
         const error = errorAsString(err)
         dispatch(setError(error))
         return []
      }
   }
)
export const addItemToMyList = createAsyncThunk<unknown, AnimeType, { state: AppRootStateType }>(
   'profile/addItemToMyList',
   async (anime, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      try {
         const animeItem: AnimeType = {
            id: anime.id,
            title: anime.title,
            main_picture: anime.main_picture,
            start_date: anime.start_date,
            end_date: anime.end_date,
            mean: anime.mean,
            status: anime.status,
            genres: anime.genres,
            num_episodes: anime.num_episodes,
            myStatus: 'unwatch',
            myRating: 0,
            idDoc: anime.idDoc,
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
export const delItemFromMyList = createAsyncThunk<unknown, string, { state: AppRootStateType }>(
   'profile/delItemFromMyList',
   async (id, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      try {
         await MyAnimeListAPI.delMyItem(id, getState().auth.uid)
         dispatch(changeStatus('success'))
      } catch (err) {
         dispatch(changeStatus('error'))
         const error = errorAsString(err)
         dispatch(setError(error))
      }
   }
)
export const changeItemData = createAsyncThunk<
   unknown,
   { id: string; data: string },
   { state: AppRootStateType }
>('profile/changeItemData', async ({ id, data }, { dispatch, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      const animeItem = doc(db, 'users/' + getState().auth.uid + '/list', id)
      await updateDoc(animeItem, { myStatus: data })
      dispatch(getMyAnimeList())
      dispatch(changeStatus('success'))
   } catch (err) {
      dispatch(changeStatus('error'))
      const error = errorAsString(err)
      dispatch(setError(error))
   }
})
