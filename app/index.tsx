import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { Pokemon, getPokemon } from '../api/pokemonapi'
import { FlashList, ListRenderItem } from '@shopify/flash-list'

const Page = () => {
  const pokemonQuery = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => getPokemon(),
  })

  const renderItem: ListRenderItem<Pokemon> = ({ item }) => (
    <Link key={item.id} href={`/(pokemon)/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.preview} />
          <Text style={styles.itemText}>{item.name}</Text>
          <Ionicons name="chevron-forward" size={24} />
        </View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={{ flex: 1 }}>
      {pokemonQuery.isLoading && (
        <ActivityIndicator style={{ marginTop: 30 }} />
      )}

      <FlashList
        data={pokemonQuery.data}
        renderItem={renderItem}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, width: '100%', backgroundColor: '#dfdfdf' }}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
  },
  preview: {
    width: 100,
    height: 100,
  },
  itemText: {
    fontSize: 18,
    textTransform: 'capitalize',
    flex: 1,
  },
})

export default Page
