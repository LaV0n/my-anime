import { CommonListType, FilterDataType } from '../common/types'
import {
   animeListReducer,
   getCurrentAnimeItem,
   getRandomAnimeItem,
   setCurrentPage,
   setFilterData,
   setLastSearchRequest,
   setPageSize,
} from '../bll/animeListReducer'
import MockAdapter from 'axios-mock-adapter'
import { setupStore } from '../utils/test-utils'
import { instance } from '../api/api'
import { responseAnimeTestItem, testAnimeItem1 } from './testData'

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
      .reply(200, responseAnimeTestItem)
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
      expect(currentAnimeItem).toEqual(responseAnimeTestItem)
   })
})
