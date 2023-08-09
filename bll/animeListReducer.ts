import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
   AnimeResponseType,
   AnimeType,
   CommonListType,
   CurrentAnimeType,
   FilterDataType,
} from '../common/types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'
import { AppRootStateType } from './store'
import { Ranking } from '../common/variables'

const filteredData = async (allItems: AnimeResponseType[], uid: string, animeList: AnimeType[]) => {
   const result: AnimeType[] = []
   for (let i = 0; i < allItems.length; i++) {
      const responseItem = await MyAnimeListAPI.getTitleShortInfo(allItems[i].node.id)
      if (uid) {
         const index = animeList.findIndex(a => a.id === allItems[i].node.id)
         if (index !== -1) {
            result.push(animeList[index])
         } else {
            result.push({ ...responseItem.data, myStatus: 'unwatch', myRating: 0, idDoc: '' })
         }
      } else {
         result.push({ ...responseItem.data, myStatus: 'unwatch', myRating: 0, idDoc: '' })
      }
   }
   return result
}

const initialState: CommonListType = {
   homeAnimeList: [],
   currentAnimeItem: null,
   topAnimeList: [],
   newAnimeList: [],
   randomAnimeItem: null,
   filterData: {
      sortByRating: 'rating',
      releaseFilter: 'all',
      category: 'all',
      genre: ['all'],
   },
}

const slice = createSlice({
   name: 'animeList',
   initialState,
   reducers: {
      clearList(state) {
         state.homeAnimeList = []
      },
      setFilterData(state, action: PayloadAction<FilterDataType>) {
         state.filterData = action.payload
      },
   },
   extraReducers: builder => {
      builder.addCase(getAnimeList.fulfilled, (state, action) => {
         state.homeAnimeList = action.payload
      })
      builder.addCase(getSearchAnimeList.fulfilled, (state, action) => {
         state.homeAnimeList = action.payload
      })
      builder.addCase(getCurrentAnimeItem.fulfilled, (state, action) => {
         state.currentAnimeItem = action.payload
      })
      builder.addCase(getShortAnimeList.fulfilled, (state, action) => {
         if (action.payload.type === Ranking.AIRING) {
            state.newAnimeList = action.payload.animeList
         } else {
            state.topAnimeList = action.payload.animeList
         }
      })
      builder.addCase(getRandomAnimeItem.fulfilled, (state, action) => {
         state.randomAnimeItem = action.payload
      })
   },
})

export const animeListReducer = slice.reducer
export const { clearList, setFilterData } = slice.actions

export const getAnimeList = createAsyncThunk<AnimeType[], string, { state: AppRootStateType }>(
   'animeList/getAnimeList',
   async (type, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      try {
         const res = await MyAnimeListAPI.getAnimeByType(type)
         const data = await filteredData(
            res.data.data,
            getState().auth.uid,
            getState().myData.animeList
         )
         dispatch(changeStatus('success'))
         return data
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
         return []
      }
   }
)

export const getShortAnimeList = createAsyncThunk<
   { animeList: AnimeResponseType[]; type: string },
   string,
   { rejectValue: { error: string } }
>('animeList/getShortAnimeList', async (type, { dispatch, rejectWithValue }) => {
   dispatch(changeStatus('loading'))
   try {
      const res = await MyAnimeListAPI.getAnimeByType(type)
      dispatch(changeStatus('success'))
      return { animeList: res.data.data, type: type }
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return rejectWithValue({ error })
   }
})
export const getSearchAnimeList = createAsyncThunk<
   AnimeType[],
   string | undefined,
   { state: AppRootStateType }
>('animeList/getSearchAnimeList', async (searchAnime, { dispatch, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      let res = {}
      if (searchAnime) {
         res = await MyAnimeListAPI.getSearchAnime(searchAnime)
      } else {
         res = await MyAnimeListAPI.getRankingAnime(getState().animeList.filterData.category)
      }
      const data = await filteredData(
         res.data.data,
         getState().auth.uid,
         getState().myData.animeList
      )
      dispatch(changeStatus('success'))
      return data
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return []
   }
})

export const getCurrentAnimeItem = createAsyncThunk<
   CurrentAnimeType,
   string,
   { state: AppRootStateType; rejectValue: { error: string } }
>('animeList/getCurrentAnimeItem', async (idAnime, { dispatch, rejectWithValue, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      const res = await MyAnimeListAPI.getCurrentAnimeItem(idAnime)
      dispatch(changeStatus('success'))
      const resData = res.data as CurrentAnimeType
      const myList = getState().myData.animeList
      for (let i = 0; i < myList.length; i++) {
         if (myList[i].id === resData.id) {
            resData.myStatus = myList[i].myStatus
            resData.myRating = myList[i].myRating
            resData.idDoc = myList[i].idDoc
         }
      }
      return resData
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return rejectWithValue({ error })
   }
})
export const getRandomAnimeItem = createAsyncThunk<
   AnimeType,
   undefined,
   { state: AppRootStateType; rejectValue: { error: string } }
>('animeList/getRandomAnimeItem', async (_, { dispatch, rejectWithValue }) => {
   dispatch(changeStatus('loading'))
   try {
      const random = Math.floor(Math.random() * 1000).toString()
      const res = await MyAnimeListAPI.getTitleShortInfo(random)
      dispatch(changeStatus('success'))
      return res.data
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return rejectWithValue({ error })
   }
})
