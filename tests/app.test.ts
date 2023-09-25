import { AppType } from '../common/types'
import {
   addBackLinkStep,
   appReducer,
   changeStatus,
   delBackLinkStep,
   setError,
} from '../bll/appReducer'

describe('App reducer tests', () => {
   let state: AppType = {
      appStatus: 'success',
      error: '',
      backLinkSteps: ['Seasonal'],
   }

   beforeEach(() => {
      state = {
         appStatus: 'success',
         error: '',
         backLinkSteps: ['Seasonal'],
      }
   })

   test('change status to Error', () => {
      const action = changeStatus('error')
      const newState = appReducer(state, action)
      expect(newState.appStatus).toBe('error')
   })
   test('error message is Alarm', () => {
      const action = setError('Alarm')
      const newState = appReducer(state, action)
      expect(newState.error).toBe('Alarm')
   })
   test('new backLinks is MyList and 666', () => {
      const action1 = addBackLinkStep('MyList')
      const newState1 = appReducer(state, action1)
      const action2 = addBackLinkStep('666')
      const newState2 = appReducer(newState1, action2)
      expect(newState2.backLinkSteps[0]).toBe('MyList')
      expect(newState2.backLinkSteps[1]).toBe('666')
   })
   test('new backLink is 123', () => {
      const action = addBackLinkStep('123')
      const newState = appReducer(state, action)
      expect(newState.backLinkSteps[newState.backLinkSteps.length - 1]).toBe('123')
   })
   test('last backLink should be 123', () => {
      const action1 = addBackLinkStep('123')
      const newState1 = appReducer(state, action1)
      const action2 = addBackLinkStep('666')
      const newState2 = appReducer(newState1, action2)
      const action3 = delBackLinkStep()
      const newState3 = appReducer(newState2, action3)
      expect(newState3.backLinkSteps[newState3.backLinkSteps.length - 1]).toBe('123')
   })
})
