import React from 'react'
import { Icon } from '@rneui/themed'
import { MyList } from '../screens/MyList'
import { Profile } from '../screens/Profile'
import { Login } from '../screens/Login'
import { SignUp } from '../screens/SignUp'
import { RootTabParamList } from '../common/types'
import { NavigationContainer } from '@react-navigation/native'
import { useAppSelector } from '../bll/store'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Search } from '../screens/Search'
import { Home } from '../screens/Home'

export const Navigation = () => {
   const Tab = createBottomTabNavigator<RootTabParamList>()
   const uid = useAppSelector(state => state.auth.uid)

   return (
      <NavigationContainer>
         <Tab.Navigator>
            <Tab.Screen
               name="Home"
               component={Home}
               options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                     <Icon name="home" color={focused ? '#06bf48' : 'grey'} type="antdesign" />
                  ),
                  tabBarActiveTintColor: '#06bf48',
               }}
            />
            <Tab.Screen
               name="Search"
               component={Search}
               options={{
                  headerShown: false,
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
                  tabBarButton: props => (uid ? <TouchableOpacity {...props} /> : null),
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
                  headerShown: false,
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
      </NavigationContainer>
   )
}
