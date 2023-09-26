import { AnimeResponseType, AnimeType, CurrentAnimeType } from '../common/types'

export const testAnimeItem1: AnimeType = {
   id: '001',
   title: 'test Title 1',
   alternative_titles: {
      synonyms: ['test synonyms 1'],
      en: 'test english title 1',
      ja: 'test japanese title 1',
   },
   main_picture: {
      medium: 'medium src test 1 img',
      large: 'large src test 1 img',
   },
   start_date: '19-03-1989',
   mean: 9,
   status: 'finished_airing',
   genres: [{ id: 1, name: 'action' }],
   media_type: 'movie',
   num_episodes: '13',
   myStatus: 'dropped',
   myRating: 5,
   myProgress: 2,
   idDoc: 'testIDDoc1',
}
export const testAnimeItem2: AnimeType = {
   id: '002',
   title: 'test Title 2',
   alternative_titles: {
      synonyms: ['test synonyms 2'],
      en: 'test english title 2',
      ja: 'test japanese title 2',
   },
   main_picture: {
      medium: 'medium src test 2 img',
      large: 'large src test 2 img',
   },
   start_date: '19-03-1989',
   mean: 5,
   status: 'currently',
   genres: [{ id: 2, name: 'action' }],
   media_type: 'music',
   num_episodes: '5',
   myStatus: 'dropped',
   myRating: 1,
   myProgress: 0,
   idDoc: 'testIDDoc2',
}
export const currentAnimeTestItem: CurrentAnimeType = {
   id: '003',
   title: 'test Title 3',
   alternative_titles: {
      synonyms: ['test synonyms 3'],
      en: 'test english title 3',
      ja: 'test japanese title 3',
   },
   main_picture: {
      medium: 'medium src test 3 img',
      large: 'large src test 3 img',
   },
   start_date: '19-03-1989',
   mean: 2,
   status: 'currently',
   genres: [{ id: 2, name: 'action' }],
   media_type: 'movie',
   num_episodes: '50',
   myStatus: 'dropped',
   myRating: 5,
   myProgress: 20,
   idDoc: 'testIDDoc3',
   synopsis: 'test synopsis',
   rank: 100,
   popularity: 100,
   source: 'manga',
   rating: 'pg_13',
   pictures: [
      {
         medium: 'medium src test 3 img',
         large: 'large src test 3 img',
      },
   ],
   related_anime: [],
   recommendations: [],
   studios: [{ id: 2, name: 'Hollywood' }],
   statistics: {
      status: {
         watching: '100',
         completed: '100',
         on_hold: '100',
         dropped: '100',
         plan_to_watch: '100',
      },
      num_list_users: 100,
   },
}
export const responseShortTestItem = {
   id: '001',
   title: 'test Title 1',
   alternative_titles: {
      synonyms: ['test synonyms 1'],
      en: 'test english title 1',
      ja: 'test japanese title 1',
   },
   main_picture: {
      medium: 'medium src test 1 img',
      large: 'large src test 1 img',
   },
   start_date: '19-03-1989',
   mean: 9,
   status: 'finished_airing',
   genres: [{ id: 1, name: 'action' }],
   media_type: 'movie',
   num_episodes: '13',
}
export const responseTestAnimeItem: AnimeResponseType = {
   node: {
      id: '001',
      title: 'test Title 1',
      alternative_titles: {
         synonyms: ['test synonyms 1'],
         en: 'test english title 1',
         ja: 'test japanese title 1',
      },
      main_picture: {
         medium: 'medium src test 1 img',
         large: 'large src test 1 img',
      },
      start_date: '19-03-1989',
      mean: 9,
      status: 'finished_airing',
      genres: [{ id: 1, name: 'action' }],
      media_type: 'movie',
      num_episodes: '13',
   },
   relation_type_formatted: 'string',
}
export const testNewAnimeItem: AnimeType = {
   id: '001',
   title: 'test Title 1',
   alternative_titles: {
      synonyms: ['test synonyms 1'],
      en: 'test english title 1',
      ja: 'test japanese title 1',
   },
   main_picture: {
      medium: 'medium src test 1 img',
      large: 'large src test 1 img',
   },
   start_date: '19-03-1989',
   mean: 9,
   status: 'finished_airing',
   genres: [{ id: 1, name: 'action' }],
   media_type: 'movie',
   num_episodes: '13',
   myStatus: 'planned',
   myRating: 0,
   myProgress: 0,
   idDoc: '',
}
