import { CommonListType, FilterDataType, SeasonDateType } from '../common/types'
import {
   animeListReducer,
   getCurrentAnimeItem,
   getRandomAnimeItem,
   getSearchAnimeList,
   getSeasonAnimeList,
   getShortAnimeList,
   setCurrentPage,
   setFilterData,
   setLastSearchRequest,
   setPageSize,
} from '../bll/animeListReducer'
import MockAdapter from 'axios-mock-adapter'
import { setupStore } from '../utils/test-utils'
import { instance } from '../api/api'
import {
   currentAnimeTestItem,
   responseShortTestItem,
   responseTestAnimeItem,
   testAnimeItem1,
   testNewAnimeItem,
} from './testData'

let state: CommonListType = {
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

const mock = new MockAdapter(instance, { delayResponse: 100 })
const mockedStore = setupStore({})

const mockNetworkRequests = () => {
   mock
      .onGet(
         'v2/anime/996?fields=start_date,end_date,mean,status,alternative_titles,genres,num_episodes'
      )
      .reply(200, testAnimeItem1)
   mock
      .onGet(
         'v2/anime/100?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,media_type,status,genres,num_episodes,source,rating,pictures,related_anime,recommendations,studios,statistics'
      )
      .reply(200, currentAnimeTestItem)
   mock
      .onGet(
         'v2/anime?q=sailor&limit=50&fields=start_date,end_date,mean,status,alternative_titles,genres,media_type,num_episodes&offset=0'
      )
      .reply(200, { data: [responseTestAnimeItem] })
   mock
      .onGet(
         'v2/anime/ranking?ranking_type=all&limit=50&fields=start_date,end_date,mean,alternative_titles,media_type,status,genres,num_episodes&offset=0'
      )
      .reply(200, { data: [responseTestAnimeItem] })
   mock
      .onGet(
         'v2/anime/ranking?ranking_type=airing&fields=start_date,end_date,mean,status,alternative_titles,genres,num_episode,media_types&limit=5&offset=0'
      )
      .reply(200, { data: [responseShortTestItem] })
   mock
      .onGet(
         'v2/anime/ranking?ranking_type=bypopularity&fields=start_date,end_date,mean,status,alternative_titles,genres,num_episode,media_types&limit=5&offset=0'
      )
      .reply(200, { data: [responseShortTestItem] })
   mock
      .onGet(
         'v2/anime/season/2007/summer?fields=start_date,end_date,mean,status,genres,alternative_titles,media_type,num_episodes&offset=0&limit=50'
      )
      .reply(200, { data: [responseTestAnimeItem] })
}

const unMockNetworkRequests = () => {
   mock.resetHistory()
}

describe('anime list tests', () => {
   beforeEach(() => {
      state = {
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
   })

   test('new filter data should accepted', () => {
      const filterData: FilterDataType = {
         sortByRating: 'rating',
         releaseFilter: 'all',
         category: 'all',
         genre: ['action', 'drama'],
         mediaType: 'ova',
      }
      const action = setFilterData(filterData)
      const newState = animeListReducer(state, action)
      expect(newState.filterData.mediaType).toBe('ova')
      expect(newState.filterData.genre.length).toBe(2)
   })
   test('last request should be exist', () => {
      const action = setLastSearchRequest('sailor')
      const newState = animeListReducer(state, action)
      expect(newState.lastRequest).toBe('sailor')
   })
   test('current page should be 10', () => {
      const action = setCurrentPage(10)
      const newState = animeListReducer(state, action)
      expect(newState.currentPage).toBe(10)
   })
   test('page size should to be 10', () => {
      const action = setPageSize(10)
      const newState = animeListReducer(state, action)
      expect(state.pageSize).not.toBe(newState.pageSize)
      expect(newState.pageSize).toBe(10)
   })
})
describe('anime list slice tests', () => {
   beforeEach(() => {
      mockNetworkRequests()
   })
   afterEach(() => {
      unMockNetworkRequests()
   })
   //api tests
   test('get profile api', async () => {
      const { data } = await instance.get(
         'v2/anime/996?fields=start_date,end_date,mean,status,alternative_titles,genres,num_episodes'
      )
      expect(data).toEqual(testAnimeItem1)
   })
   //thunk tests
   test('get random item', async () => {
      await mockedStore.dispatch(getRandomAnimeItem())
      const randomAnimeItem = mockedStore.getState().animeList.randomAnimeItem
      expect(randomAnimeItem).toEqual(testAnimeItem1)
   })
   test('get current anime', async () => {
      await mockedStore.dispatch(getCurrentAnimeItem('100'))
      const currentAnimeItem = mockedStore.getState().animeList.currentAnimeItem
      expect(currentAnimeItem).toEqual(currentAnimeTestItem)
   })
   test('get search anime list', async () => {
      await mockedStore.dispatch(getSearchAnimeList('sailor'))
      const searchAnimeList = mockedStore.getState().animeList.homeAnimeList
      expect(searchAnimeList[0]).toEqual(testNewAnimeItem)
   })
   test('get clean search request ', async () => {
      await mockedStore.dispatch(getSearchAnimeList())
      const searchAnimeList = mockedStore.getState().animeList.homeAnimeList
      expect(searchAnimeList[0]).toEqual(testNewAnimeItem)
   })
   test('get new anime list', async () => {
      await mockedStore.dispatch(getShortAnimeList('airing'))
      const newAnimeList = mockedStore.getState().animeList.newAnimeList
      expect(newAnimeList[0]).toEqual(responseShortTestItem)
   })
   test('get new anime list', async () => {
      await mockedStore.dispatch(getShortAnimeList('bypopularity'))
      const topAnimeList = mockedStore.getState().animeList.topAnimeList
      expect(topAnimeList[0]).toEqual(responseShortTestItem)
   })
   test('get season summer 2007 anime list', async () => {
      const seasonData: SeasonDateType = {
         year: '2007',
         season: 'summer',
      }
      await mockedStore.dispatch(getSeasonAnimeList(seasonData))
      const seasonAnimeList = mockedStore.getState().animeList.homeAnimeList
      expect(seasonAnimeList[0]).toEqual(testNewAnimeItem)
   })
})
