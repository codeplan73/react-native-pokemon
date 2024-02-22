import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Pokemon, getPokmonDetails } from '../../api/pokemonapi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [details, setDetails] = useState<Pokemon>()
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const load = async () => {
      const details = await getPokmonDetails(id!)
      setDetails(details)
      navigation.setOptions({
        title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      })

      const isFavorite = await AsyncStorage.getItem(`favorite-${id}`)
      setIsFavorite(isFavorite === 'true')
    }

    load()
  }, [id])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={22}
            Colors={'#fff'}
          />
        </Text>
      ),
    })
  }, [isFavorite])

  const toggleFavorite = async () => {
    await AsyncStorage.setItem(`favorite-${id}`, !isFavorite ? 'true' : 'false')
    setIsFavorite(!isFavorite)
  }

  return (
    <View style={{ padding: 10 }}>
      {details && (
        <>
          <View style={[styles.card, { alignItems: 'center' }]}>
            <Image
              source={{ uri: details.sprites.front_default }}
              style={{ width: 250, height: 240 }}
            />
            <Text style={styles.name}>#{`${details.id} ${details.name}`}</Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Stats</Text>
            {details.stats.map((item: any) => (
              <Text key={item.stat.name}>
                {item.stat.name}: {item.base_stat}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    elevation: 1,
    borderRadius: 5,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
  },
})
