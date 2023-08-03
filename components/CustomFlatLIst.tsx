import React, { useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Overlay, Theme, useTheme } from '@rneui/themed'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { useAppDispatch } from '../bll/store'
import { AnimeResponseType, CustomFlatListType, PictureSourceType } from '../common/types'
import { defaultImg } from '../common/variables'

const windowWidth = Dimensions.get('window').width
export const CustomFlatLIst = ({ name, data, isLinked }: CustomFlatListType) => {
   const [visible, setVisible] = useState(false)
   const [uri, setUri] = useState<string>(defaultImg)
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const dispatch = useAppDispatch()

   const openItem = (id: string) => {
      dispatch(getCurrentAnimeItem(id))
   }
   const openCover = (url: string) => {
      setUri(url)
      setVisible(!visible)
   }

   return (
      <View>
         <Text style={styles.secondTitle}>{name}</Text>
         <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
            <View style={styles.bigPictureBlock}>
               <Image source={{ uri }} style={styles.bigPicture} />
            </View>
         </Overlay>
         {isLinked ? (
            <FlatList
               data={data as AnimeResponseType[]}
               horizontal
               renderItem={({ item }) => (
                  <TouchableOpacity
                     key={item.node.id}
                     style={styles.relatedBlock}
                     onPress={() => openItem(item.node.id)}
                  >
                     <Image
                        source={{ uri: item.node.main_picture.medium }}
                        style={styles.picture}
                     />
                     <Text style={styles.relatedTitle}>{item.node.title}</Text>
                  </TouchableOpacity>
               )}
            />
         ) : (
            <FlatList
               data={data as PictureSourceType[]}
               style={{ marginTop: 10 }}
               horizontal
               renderItem={({ item }) => (
                  <TouchableOpacity
                     key={item.medium}
                     style={styles.relatedBlock}
                     onPress={() => openCover(item.large)}
                  >
                     <Image source={{ uri: item.medium }} style={styles.picture} />
                  </TouchableOpacity>
               )}
            />
         )}
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      secondTitle: {
         color: colors.colors.white,
         marginTop: 20,
         fontSize: 20,
         fontWeight: '600',
      },
      relatedBlock: {
         width: 200,
         marginLeft: 10,
      },
      relatedTitle: {
         position: 'absolute',
         bottom: 5,
         color: colors.colors.white,
         paddingHorizontal: 5,
         flexShrink: 1,
         flexWrap: 'wrap',
         width: '100%',
         fontSize: 16,
         marginLeft: 5,
         backgroundColor: colors.colors.grey2,
      },
      picture: {
         width: 200,
         aspectRatio: 2 / 3,
         marginLeft: 5,
      },
      bigPictureBlock: {
         width: windowWidth - 50,
         height: 500,
      },
      bigPicture: {
         resizeMode: 'cover',
         width: '100%',
         height: '100%',
      },
   })
