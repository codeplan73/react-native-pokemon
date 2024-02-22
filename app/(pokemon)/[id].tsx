import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Pokemon, getPokmonDetails } from '../../api/pokemonapi'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [details, setDetails] = useState<Pokemon>()
  const navigation = useNavigation()

  useEffect(() => {
    const load = async () => {
      const details = await getPokmonDetails(id!)
      setDetails(details)
      navigation.setOptions({
        title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      })
    }

    load()
  }, [id])

  return (
    <View style={{}}>
      <Text>{details?.name}</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})
