import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootTabParamList } from './types'
import { Profile } from './screens/Profile'
import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { Provider } from 'react-redux'
import { store } from './bll/store'
import { SignUp } from './screens/SignUp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MyList } from './screens/MyList'
import { Icon } from '@rneui/themed'

export default function App() {
   const Tab = createBottomTabNavigator<RootTabParamList>()

   return (
      <NavigationContainer>
         <Provider store={store}>
            <Tab.Navigator>
               <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                     tabBarIcon: ({ focused }) => (
                        <Icon name="home" color={focused ? '#06bf48' : 'grey'} type="antdesign" />
                     ),
                     tabBarActiveTintColor: '#06bf48',
                  }}
               />
               <Tab.Screen
                  name="MyList"
                  component={MyList}
                  options={{
                     tabBarIcon: ({ focused }) => (
                        <Icon name="list" color={focused ? '#06bf48' : 'grey'} />
                     ),
                     title: 'My List',
                     tabBarActiveTintColor: '#06bf48',
                  }}
               />
               <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                     tabBarIcon: ({ focused }) => (
                        <Icon name="person-outline" color={focused ? '#06bf48' : 'grey'} />
                     ),
                     tabBarActiveTintColor: '#06bf48',
                  }}
               />
               <Tab.Screen
                  name="Login"
                  component={Login}
                  options={{
                     tabBarButton: () => null,
                  }}
               />
               <Tab.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{
                     tabBarButton: () => null,
                  }}
               />
            </Tab.Navigator>
         </Provider>
      </NavigationContainer>
   )
}
