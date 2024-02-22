import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { Pokemon, getPokmon } from '../api/pokemonapi'

const Page = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  useEffect(() => {
    const load = async () => {
      const result = await getPokmon()
      setPokemon(result)
    }

    load()
  }, [])

  return (
    <ScrollView>
      {pokemon.map((p) => (
        <Link key={p.id} href={`/(pokemon)/${p.id}`} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={{ uri: p.image }} style={styles.preview} />
              <Text style={styles.itemText}>{p.name}</Text>
              <Ionicons name="chevron-forward" size={24} />
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
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
