import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Pokemon, getPokmonDetails } from '../../api/pokemonapi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { storage } from '../../api/mmkv'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState<boolean>(
    storage.getString(`favorite-${id}`) === 'true'
  )

  // useEffect(() => {
  //   const load = async () => {
  //     const isFavorite = await AsyncStorage.getItem(`favorite-${id}`)
  //     setIsFavorite(isFavorite === 'true')
  //   }

  //   load()
  // }, [id])

  const pokemonQuery = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokmonDetails(id!),
    keepPreviousDate: true,
    refetchOnMount: false,
    onSuccess: (data: Pokemon) => {
      navigation.setOptions({
        title: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      })
    },
  })

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
    storage.set(`favorite-${id}`, !isFavorite ? 'true' : 'flalse')
    setIsFavorite(!isFavorite)
  }

  return (
    <View style={{ padding: 10 }}>
      {pokemonQuery.data && (
        <>
          <View style={[styles.card, { alignItems: 'center' }]}>
            <Image
              source={{ uri: pokemonQuery.data.sprites.front_default }}
              style={{ width: 250, height: 240 }}
            />
            <Text style={styles.name}>
              #{`${pokemonQuery.data.id} ${pokemonQuery.data.name}`}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Stats</Text>
            {pokemonQuery.data.stats.map((item: any) => (
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
