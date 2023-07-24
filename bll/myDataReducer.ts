import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeType, MyDataType } from '../common/types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { AppRootStateType } from './store'
import { changeStatus, setError } from './appReducer'

const initialState: MyDataType = {
   animeList: [],
}

const slice = createSlice({
   name: 'myData',
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

export const myDataReducer = slice.reducer
export const { clearMyList } = slice.actions

export const getMyAnimeList = createAsyncThunk<AnimeType[], undefined, { state: AppRootStateType }>(
   'myData/getMyAnimeList',
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
   'myData/addItemToMyList',
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
         await MyAnimeListAPI.addItemToMyList(getState().auth.uid, animeItem)
         dispatch(getMyAnimeList())
         dispatch(changeStatus('success'))
      } catch (err) {
         dispatch(changeStatus('error'))
         const error = errorAsString(err)
         dispatch(setError(error))
      }
   }
)
export const delItemFromMyList = createAsyncThunk<unknown, string, { state: AppRootStateType }>(
   'myData/delItemFromMyList',
   async (id, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      try {
         await MyAnimeListAPI.delMyItem(id, getState().auth.uid)
         dispatch(getMyAnimeList())
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
   { id: string; data: string | number },
   { state: AppRootStateType }
>('myData/changeItemData', async ({ id, data }, { dispatch, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      await MyAnimeListAPI.changeItemData(getState().auth.uid, id, data)
      dispatch(getMyAnimeList())
      dispatch(changeStatus('success'))
   } catch (err) {
      dispatch(changeStatus('error'))
      const error = errorAsString(err)
      dispatch(setError(error))
   }
})
