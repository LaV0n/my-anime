import React, { useState } from 'react'
import { CheckBox, Colors, Overlay, Theme, useTheme } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ProfileSettingType } from '../common/types'
import { defaultImg } from '../common/variables'
import { setProfileImg, setStorageData, setUserName } from '../bll/profileReducer'

export const ProfileSetting = ({ isOpen, setIsOpen }: ProfileSettingType) => {
   const userName = useAppSelector(state => state.profile.name)
   const userImg = useAppSelector(state => state.profile.profileImg)
   const [name, setName] = useState(userName)
   const [image, setImage] = useState(userImg)
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const toggleMessage = () => {
      setIsOpen(!isOpen)
   }
   const setUserDataHandler = () => {
      setIsOpen(false)
      dispatch(setProfileImg(image))
      dispatch(setUserName(name))
      dispatch(setStorageData())
   }

   return (
      <Overlay onBackdropPress={toggleMessage} isVisible={isOpen}>
         <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.mainImg} />
            <Text style={styles.setTitle}>Choose avatar</Text>
            <View style={styles.checkboxBlock}>
               <View style={styles.checkboxItem}>
                  <Image source={{ uri: defaultImg.girl }} style={styles.checkboxImg} />
                  <CheckBox
                     checked={image === defaultImg.girl}
                     onPress={() => {
                        setImage(defaultImg.girl)
                     }}
                  />
               </View>
               <View style={styles.checkboxItem}>
                  <Image source={{ uri: defaultImg.boy }} style={styles.checkboxImg} />
                  <CheckBox
                     checked={image === defaultImg.boy}
                     onPress={() => {
                        setImage(defaultImg.boy)
                     }}
                  />
               </View>
               <View style={styles.checkboxItem}>
                  <Image source={{ uri: defaultImg.animal }} style={styles.checkboxImg} />
                  <CheckBox
                     checked={image === defaultImg.animal}
                     onPress={() => {
                        setImage(defaultImg.animal)
                     }}
                  />
               </View>
               <View style={styles.checkboxItem}>
                  <Image source={{ uri: defaultImg.robot }} style={styles.checkboxImg} />
                  <CheckBox
                     checked={image === defaultImg.robot}
                     onPress={() => {
                        setImage(defaultImg.robot)
                     }}
                  />
               </View>
            </View>
            <Text style={styles.titleName}>Your Name</Text>
            <TextInput
               placeholder="name"
               placeholderTextColor={theme.colors.grey0}
               value={name}
               onChangeText={setName}
               style={styles.inputBlock}
            />
            <TouchableOpacity
               onPress={setUserDataHandler}
               disabled={name.length === 0}
               style={name.length !== 0 ? styles.setButton : styles.setButtonDisable}
            >
               <Text style={styles.setTitle}>set new data</Text>
            </TouchableOpacity>
         </View>
      </Overlay>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
         alignItems: 'center',
         width: 300,
         padding: 20,
         gap: 20,
      },
      titleName: {
         color: colors.colors.white,
         fontSize: 22,
         fontWeight: '600',
      },
      inputBlock: {
         borderRadius: 15,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         color: colors.colors.primary,
         paddingHorizontal: 20,
         fontSize: 18,
         backgroundColor: colors.colors.grey1,
         width: '90%',
         height: 50,
      },
      setButton: {
         borderRadius: 25,
         marginTop: 30,
         backgroundColor: colors.colors.secondary,
         width: '90%',
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
      },
      setButtonDisable: {
         borderRadius: 25,
         marginTop: 30,
         backgroundColor: colors.colors.grey0,
         width: '90%',
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
      },
      setTitle: {
         color: colors.colors.primary,
         fontSize: 18,
         fontWeight: '600',
      },
      mainImg: {
         height: 100,
         width: 100,
         marginBottom: 10,
      },
      checkboxImg: {
         height: 30,
         width: 30,
         borderRadius: 15,
      },
      checkboxItem: {
         flexDirection: 'column',
         alignItems: 'center',
      },
      checkboxBlock: {
         flexDirection: 'row',
         marginTop: 5,
         padding: 5,
         borderStyle: 'solid',
         borderRadius: 10,
         borderWidth: 2,
         borderColor: colors.colors.grey0,
      },
   })
