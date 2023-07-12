import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import { Profile } from './screens/Profile'
import { Home } from './screens/Home'

const Stack = createNativeStackNavigator<RootStackParamList>()
export default function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
         </Stack.Navigator>
      </NavigationContainer>
   )
}
