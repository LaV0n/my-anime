import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import { Profile } from './screens/Profile'
import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { Provider } from 'react-redux'
import { store } from './bll/store'
import { SignUp } from './screens/SignUp'

const Stack = createNativeStackNavigator<RootStackParamList>()
export default function App() {
   return (
      <NavigationContainer>
         <Provider store={store}>
            <Stack.Navigator initialRouteName={'Home'}>
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="Profile" component={Profile} />
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
         </Provider>
      </NavigationContainer>
   )
}
