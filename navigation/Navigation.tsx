import React from 'react'
import { Icon, useTheme } from '@rneui/themed'
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
import { Filter } from '../screens/Filter'
import { AnimeItem } from '../screens/AnimeItem'

export const Navigation = () => {
   const Tab = createBottomTabNavigator<RootTabParamList>()
   const uid = useAppSelector(state => state.auth.uid)
   const { theme } = useTheme()

   return (
      <NavigationContainer>
         <Tab.Navigator
            screenOptions={{ tabBarStyle: { backgroundColor: theme.colors.background } }}
         >
            <Tab.Screen
               name="Home"
               component={Home}
               options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                     <Icon
                        name="home"
                        color={focused ? theme.colors.secondary : theme.colors.grey0}
                        type="antdesign"
                     />
                  ),
                  tabBarActiveTintColor: theme.colors.secondary,
               }}
            />
            <Tab.Screen
               name="Search"
               component={Search}
               options={{
                  headerShown: false,
                  tabBarButton: () => null,
                  tabBarStyle: { display: 'none' },
               }}
            />
            <Tab.Screen
               name="Filter"
               component={Filter}
               options={{
                  headerShown: false,
                  tabBarButton: () => null,
                  tabBarStyle: { display: 'none' },
               }}
            />
            <Tab.Screen
               name="MyList"
               component={MyList}
               options={{
                  tabBarIcon: ({ focused }) => (
                     <Icon
                        name="list"
                        color={focused ? theme.colors.secondary : theme.colors.grey0}
                     />
                  ),
                  headerShown: false,
                  title: 'My List',
                  tabBarActiveTintColor: theme.colors.secondary,
                  tabBarButton: props => (uid ? <TouchableOpacity {...props} /> : null),
               }}
            />
            <Tab.Screen
               name="Profile"
               component={Profile}
               options={{
                  tabBarIcon: ({ focused }) => (
                     <Icon
                        name="person-outline"
                        color={focused ? theme.colors.secondary : theme.colors.grey0}
                     />
                  ),
                  headerShown: false,
                  tabBarActiveTintColor: theme.colors.secondary,
               }}
            />
            <Tab.Screen
               name="Login"
               component={Login}
               options={{
                  headerShown: false,
                  tabBarButton: () => null,
                  tabBarStyle: { display: 'none' },
               }}
            />
            <Tab.Screen
               name="SignUp"
               component={SignUp}
               options={{
                  headerShown: false,
                  tabBarButton: () => null,
                  tabBarStyle: { display: 'none' },
               }}
            />
            <Tab.Screen
               name="AnimeItem"
               component={AnimeItem}
               options={{
                  headerShown: false,
                  tabBarButton: () => null,
               }}
            />
         </Tab.Navigator>
      </NavigationContainer>
   )
}
