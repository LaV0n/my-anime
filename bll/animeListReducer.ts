import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
   AnimeResponseType,
   AnimeType,
   CommonListType,
   CurrentAnimeType,
   FilterDataType,
   SeasonDateType,
} from '../common/types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'
import { AppRootStateType } from './store'
import { Ranking } from '../common/variables'
import { checkingImg, filterAnimeListData } from '../utils/utils'

const filteredByOwnerData = (
   allItems: AnimeResponseType[],
   uid: string,
   animeList: AnimeType[]
) => {
   const result: AnimeType[] = []
   for (let i = 0; i < allItems.length; i++) {
      const index = animeList.findIndex(a => a.id === allItems[i].node.id)
      if (uid && index !== -1) {
         result.push(animeList[index])
      } else {
         result.push({
            ...allItems[i].node,
            myStatus: 'planned',
            myRating: 0,
            myProgress: 0,
            idDoc: '',
         })
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
   lastRequest: '',
   filterData: {
      sortByRating: 'rating',
      releaseFilter: 'all',
      category: 'all',
      genre: ['all'],
      mediaType: 'unknown',
   },
   currentPage: 0,
   pageSize: 50,
}

const slice = createSlice({
   name: 'animeList',
   initialState,
   reducers: {
      setFilterData(state, action: PayloadAction<FilterDataType>) {
         state.filterData = action.payload
      },
      setLastSearchRequest(state, action: PayloadAction<string>) {
         state.lastRequest = action.payload
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
      setPageSize(state, action: PayloadAction<number>) {
         state.pageSize = action.payload
         state.currentPage = 0
      },
   },
   extraReducers: builder => {
      builder.addCase(getSearchAnimeList.fulfilled, (state, action) => {
         state.homeAnimeList = checkingImg(action.payload) as AnimeType[]
      })
      builder.addCase(getCurrentAnimeItem.fulfilled, (state, action) => {
         state.currentAnimeItem = checkingImg(action.payload) as CurrentAnimeType
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
      builder.addCase(getRandomAnimeItem.rejected, (state, action) => {
         state.randomAnimeItem = action.payload ? action.payload : null
      })
      builder.addCase(getSeasonAnimeList.fulfilled, (state, action) => {
         state.homeAnimeList = checkingImg(action.payload) as AnimeType[]
      })
   },
})

export const animeListReducer = slice.reducer
export const { setFilterData, setLastSearchRequest, setCurrentPage, setPageSize } = slice.actions

export const getSeasonAnimeList = createAsyncThunk<
   AnimeType[],
   SeasonDateType,
   { state: AppRootStateType }
>('animeList/getSeasonAnimeList', async (date, { dispatch, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      const res = await MyAnimeListAPI.getSeasonAnime(
         date,
         getState().animeList.currentPage,
         getState().animeList.pageSize
      )
      const data = filteredByOwnerData(
         res.data.data,
         getState().auth.uid,
         getState().myData.animeList
      )
      dispatch(changeStatus('success'))
      return filterAnimeListData(data, getState().animeList.filterData)
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return []
   }
})
export const getShortAnimeList = createAsyncThunk<
   { animeList: AnimeResponseType[]; type: string },
   string,
   { rejectValue: { error: string } }
>('animeList/getShortAnimeList', async (type, { dispatch, rejectWithValue }) => {
   dispatch(changeStatus('loading'))
   try {
      const res = await MyAnimeListAPI.getAnimeByType(type, 0, 5)
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
      let res: { data: { data: AnimeResponseType[] } }
      if (searchAnime) {
         res = await MyAnimeListAPI.getSearchAnime(
            searchAnime,
            getState().animeList.currentPage,
            getState().animeList.pageSize
         )
      } else {
         res = await MyAnimeListAPI.getRankingAnime(
            getState().animeList.filterData.category,
            getState().animeList.currentPage,
            getState().animeList.pageSize
         )
      }
      const data = filteredByOwnerData(
         res.data.data,
         getState().auth.uid,
         getState().myData.animeList
      )
      dispatch(changeStatus('success'))
      return filterAnimeListData(data, getState().animeList.filterData)
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
            resData.myProgress = myList[i].myProgress
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
   { state: AppRootStateType; rejectValue: AnimeType }
>('animeList/getRandomAnimeItem', async (_, { dispatch, rejectWithValue }) => {
   dispatch(changeStatus('loading'))
   try {
      const random = Math.floor(Math.random() * 10000 + 1).toString()
      const res = await MyAnimeListAPI.getTitleShortInfo(random)
      dispatch(changeStatus('success'))
      return res.data
   } catch (err) {
      const res = await MyAnimeListAPI.getTitleShortInfo('996') //getting actually existing anime item
      return rejectWithValue(res.data)
   }
})
