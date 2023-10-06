import { FilterDataType, MyDataType } from '../common/types'
import {
   clearMyList,
   filterMyList,
   myDataReducer,
   searchMyList,
   setFilterMyListData,
} from '../bll/myDataReducer'
import { testAnimeItem1, testAnimeItem2 } from './testData'

describe('myDataReducer tests', () => {
   let state: MyDataType = {
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

   beforeEach(() => {
      state = {
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
   })
   test('MyList should be empty', () => {
      const action = clearMyList()
      const newState = myDataReducer(state, action)
      expect(newState.animeList.length).toBe(0)
   })
   test('filter my anime data', () => {
      const action = filterMyList()
      const newState = myDataReducer(
         {
            animeList: [testAnimeItem1, testAnimeItem2],
            filterData: { ...state.filterData, myStars: '1' },
         },
         action
      )
      expect(newState.animeList.length).toBe(1)
      expect(newState.animeList[0].title).toBe('test Title 2')
   })
   test('search in my list', () => {
      const action = searchMyList('test Title 1')
      const newState = myDataReducer(
         { ...state, animeList: [testAnimeItem1, testAnimeItem2] },
         action
      )
      expect(newState.animeList.length).toBe(1)
      expect(newState.animeList[0].title).toBe('test Title 1')
   })
   test('set new filter data', () => {
      const filterData: FilterDataType = {
         sortByRating: 'rating',
         releaseFilter: 'all',
         category: 'special',
         genre: ['all'],
         myStatus: 'all',
         myStars: '1',
         mediaType: 'ova',
      }
      const action = setFilterMyListData(filterData)
      const newState = myDataReducer(state, action)
      expect(newState.filterData.mediaType).toBe('ova')
      expect(newState.filterData.category).toBe('special')
   })
})
