import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
   AnimeType,
   CurrentAnimeType,
   FilterDataType,
   MyDataType,
   RequestItemType,
} from '../common/types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { AppRootStateType } from './store'
import { changeStatus, setError } from './appReducer'
import { filterAnimeListData, titleNameSelector } from '../utils/utils'

const initialState: MyDataType = {
   animeList: [],
   filterData: {
      sortByRating: 'rating',
      releaseFilter: 'all',
      category: 'all',
      genre: ['all'],
      myStatus: 'all',
      myStars: '0',
      mediaType: 'unknown',
   },
}

const slice = createSlice({
   name: 'myData',
   initialState,
   reducers: {
      clearMyList(state) {
         state.animeList = []
      },
      filterMyList(state) {
         state.animeList = filterAnimeListData(state.animeList, state.filterData)
      },
      searchMyList(state, action: PayloadAction<string>) {
         state.animeList = state.animeList.filter(a =>
            a.title.toLowerCase().includes(action.payload.toLowerCase())
         )
      },
      setFilterMyListData(state, action: PayloadAction<FilterDataType>) {
         state.filterData = action.payload
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
export const { clearMyList, searchMyList, filterMyList, setFilterMyListData } = slice.actions

export const getMyAnimeList = createAsyncThunk<AnimeType[], undefined, { state: AppRootStateType }>(
   'myData/getMyAnimeList',
   async (_, { getState, dispatch }) => {
      dispatch(changeStatus('loading'))
      try {
         dispatch(clearMyList)
         const data = await MyAnimeListAPI.getMyList(getState().auth.uid)
         dispatch(changeStatus('success'))
         return data.docs.map(doc => ({ ...doc.data(), idDoc: doc.id })) as AnimeType[]
      } catch (err) {
         dispatch(changeStatus('error'))
         dispatch(
            setError('Authorization Alert,For the full operation of app you need log in or sing up')
         )
         return []
      }
   }
)
export const addItemToMyList = createAsyncThunk<
   unknown,
   AnimeType | CurrentAnimeType,
   { state: AppRootStateType }
>('myData/addItemToMyList', async (anime, { dispatch, getState }) => {
   try {
      const animeItem: AnimeType = {
         id: anime.id,
         title: titleNameSelector(anime),
         main_picture: anime.main_picture,
         start_date: anime.start_date ? anime.start_date : '',
         mean: anime.mean ? anime.mean : 0,
         status: anime.status,
         genres: anime.genres,
         num_episodes: anime.num_episodes,
         media_type: anime.media_type,
         myStatus: 'planned',
         myRating: 0,
         myProgress: 0,
         idDoc: '',
      }
      await MyAnimeListAPI.addItemToMyList(getState().auth.uid, animeItem)
      dispatch(getMyAnimeList())
   } catch (err) {
      const error = errorAsString(err)
      dispatch(setError(error))
   }
})
export const delItemFromMyList = createAsyncThunk<unknown, string, { state: AppRootStateType }>(
   'myData/delItemFromMyList',
   async (id, { dispatch, getState }) => {
      try {
         await MyAnimeListAPI.delMyItem(id, getState().auth.uid)
         dispatch(getMyAnimeList())
      } catch (err) {
         const error = errorAsString(err)
         dispatch(setError(error))
      }
   }
)
export const changeItemData = createAsyncThunk<
   unknown,
   { id: string; data: string | number; requestType: RequestItemType },
   { state: AppRootStateType }
>('myData/changeItemData', async ({ id, data, requestType }, { dispatch, getState }) => {
   try {
      await MyAnimeListAPI.changeItemData(getState().auth.uid, id, data, requestType)
      dispatch(getMyAnimeList())
   } catch (err) {
      const error = errorAsString(err)
      dispatch(setError(error))
   }
})
