import { ProfileDataType } from '../common/types'
import { defaultImg } from '../common/variables'
import { profileReducer, setColorMode, setProfileImg, setUserName } from '../bll/profileReducer'

describe('profile reducer tests', () => {
   let state: ProfileDataType = {
      name: '',
      colorMode: 'dark',
      profileImg: defaultImg.girl,
   }
   beforeEach(() => {
      state = {
         name: '',
         colorMode: 'dark',
         profileImg: defaultImg.girl,
      }
   })
   test('user name should to be Anna', () => {
      const action = setUserName('Anna')
      const newState = profileReducer(state, action)
      expect(newState.name).toBe('Anna')
   })
   test('color mode should to be light', () => {
      const action = setColorMode('light')
      const newState = profileReducer(state, action)
      expect(newState.colorMode).toBe('light')
   })
   test('profile img should to be someimg.jpg', () => {
      const action = setProfileImg('someimg.jpg')
      const newState = profileReducer(state, action)
      expect(newState.profileImg).toBe('someimg.jpg')
   })
})
